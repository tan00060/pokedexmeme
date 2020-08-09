const app = {

    userSearch: "",
    pokemonMoves: [],
    pokemonAbilities: [],
    pokemonTypes: [],
    currentSprite: "",
    pokemonSprites: [],
    currentPokemon: "",
    API: "https://pokeapi.co/api/v2/pokemon/",
    value: "",
    pokemonInfo: [],
    pokemonStats: "",

    init: () => {
        console.log("testwefew")
        document.getElementById("searchButton").addEventListener('click', app.userSearchValue);
        document.getElementById("pokemonMoves").addEventListener('click', app.getMoves);
        document.getElementById("pokemonAbilities").addEventListener('click', app.getAbilities);
        document.getElementById("rightcross").addEventListener('click', app.nextPokemon);
        document.getElementById("leftcross").addEventListener('click', app.backPokemon);
        document.getElementById("botcross").addEventListener('click', app.downSprite);
        document.getElementById("topcross").addEventListener('click', app.upSprite);
        document.getElementById("search-box").addEventListener("submit", (event) => {
                event.preventDefault();
                app.userSearchValue();
            });
        document.getElementById("pokemonInfo").addEventListener("click", app.displayInfo)
        document.getElementById("pokemonStats").addEventListener("click", app.getStats)


    },
    userSearchValue: () => {
        let searchValue = document.getElementById("myText").value
        if (searchValue) {
            app.userSearch = searchValue.toLowerCase().trim();
            console.log("this is what the user is searching for " + app.userSearch)
            document.getElementById("myText").value = "";
            app.searchPokemon()
        } else {
            console.log("this is the current pokemon " + app.currentPokemon)
            console.log("lookng for nothing")
            app.displayPokemon()
        }

    },

    searchPokemon: () => {
        console.log("We are looking for the pokemon now!")
        fetch(`${app.API}${app.userSearch}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                app.currentPokemon = data.id
                app.displayPokemon()
            })
            .catch((err) => {
                console.log("we have hit an error!!")
                app.userSearchValue();
            })
    },

    getTypes: () => {
        let newString = [];

        app.pokemonTypes.forEach(type => {
            const newType = type.type.name;
            newString.push(newType[0].toUpperCase() + newType.slice(1));
        });

        newString = newString.join(', ')
        document.getElementById("type").textContent = `Type: ${newString}`

    },

    getMoves: () => {
        
        let stats = document.getElementById("stats");
        let list = document.createElement("ul")
        stats.innerHTML = ''




        list.id = "pokeballBullet"

        list.id = "moveList"
        stats.appendChild(list)
        for (let i = 0; i < app.pokemonMoves.length; i++) {
            let moves = document.createElement("li")
            moves.id = "pokeballBullet"
            list.appendChild(moves)
            moves.textContent = `${app.pokemonMoves[i].move.name}`
            stats.appendChild(moves)
        }
    },

    clearMoves: () => {
        let stats = document.getElementById('stats')
        stats.innerHTML = ''
    },

    getInfo: (data) =>{
        app.pokemonInfo = []
        app.pokemonInfo.push(data.weight)
        app.pokemonInfo.push(data.height)

        console.log(app.pokemonInfo)
    },

    displayInfo: () =>{

    },

    nextPokemon: () => {
        console.log("go forward one pokemon!")
        app.currentPokemon = app.currentPokemon + 1
        app.displayPokemon()

        if (document.getElementById('moves')) {
            app.clearMoves()
        }
    },

    backPokemon: () => {
        console.log("go back one pokemon")
        app.currentPokemon = app.currentPokemon - 1
        app.displayPokemon()

        if (document.getElementById('moves')) {
            app.clearMoves()
        }
    },

    displayPokemon: () => {
        console.log("this is display pokemon")
        fetch(`${app.API}${app.currentPokemon}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let stats = document.getElementById("moves");
                stats.innerHTML = ''                
                let id = document.createElement('p')
                let name = document.createElement('p')


                id.textContent = `ID: ${data.id}`
                name.textContent = `Name: ${
                    data.name[0].toUpperCase() + data.name.slice(1)
                }`;

                app.pokemonMoves = data.moves;
                app.pokemonAbilities = data.abilities;
                app.pokemonTypes = data.types
                app.currentPokemon = data.id

                app.getSprites(data);
                app.getInfo(data);

                stats.appendChild(id)
                stats.appendChild(name)
                app.getTypes()


                app.pokemonStats = JSON.stringify(data.stats)
                document.getElementById("pokePic").src = app.pokemonSprites[0]
            })
            .catch((err) => {
                console.log("we have hit an error!!")
            })
    },

    getSprites: (data) => {
        app.pokemonSprites = []
        app.pokemonSprites.push(data.sprites.front_default)
        app.pokemonSprites.push(data.sprites.back_default)
        app.pokemonSprites.push(data.sprites.front_shiny)
        app.pokemonSprites.push(data.sprites.back_shiny)
    },

    downSprite: () => {
        let pokePic = document.getElementById("pokePic")

        if (app.pokemonSprites[`${app.value}`] === app.pokemonSprites[`${app.value}`]) {
            if (app.value === app.pokemonSprites.length - 1) {
                console.log("this is the end")
                app.value = 0
                pokePic.src = '';
                pokePic.src = app.pokemonSprites[app.value]
            } else {
                app.value++
                console.log("downsprite value " + app.value)
                console.log(app.pokemonSprites[1])
                pokePic.src = '';
                pokePic.src = app.pokemonSprites[app.value]
            }
        }
    },

    upSprite: () => {
        let pokePic = document.getElementById("pokePic")

        if (app.pokemonSprites[`${app.value}`] === app.pokemonSprites[`${app.value}`]) {
            if (app.value == -1 + 1) {
                console.log("this is negative")
                app.value = 3
                pokePic.src = app.pokemonSprites[app.value]
            } else {
                app.value--
                console.log(app.pokemonSprites)
                pokePic.src = '';
                pokePic.src = app.pokemonSprites[app.value]
            }
        }
    },

    getAbilities: () => {
        console.log("lets find out abilities!!")

        let stats = document.getElementById('stats')
        stats.innerHTML = ''
        console.log("clear innerHTML")

        for (let i = 0; i < app.pokemonAbilities.length; i++) {
            let abilities = document.createElement('p')
            abilities.textContent = `${app.pokemonAbilities[i].ability.name}`

            stats.appendChild(abilities)
            console.log(app.pokemonAbilities[i].ability.name)
        }
    },

    nextPokemon: () => {
        console.log("go forward one pokemon!");
        app.currentPokemon = app.currentPokemon + 1;
        app.displayPokemon();
    },

    backPokemon: () => {
        console.log("go back one pokemon");
        app.currentPokemon = app.currentPokemon - 1;
        app.displayPokemon();
    },

    getStats: () => {
        let stats = document.getElementById('stats')
        stats.innerHTML = ''
        let contain = document.createElement("div")
        let pokemonStats = JSON.parse(app.pokemonStats)

        for (let i = 0; i < pokemonStats.length; i++) {
            let base_stats = document.createElement('p')

            base_stats.textContent = `${pokemonStats[i].stat.name.toUpperCase()}: ${pokemonStats[i].base_stat}`

            contain.appendChild(base_stats)
            stats.appendChild(contain)
        }

    }

};

document.addEventListener("DOMContentLoaded", app.init);