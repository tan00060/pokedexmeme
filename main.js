const app = {

    userSearch: "",
    pokemonMoves: [],
    pokemonAbilities: [],
    pokemonTypes: [],
    currentSprite: "",
    pokemonSprites: "",
    currentPokemon: "",
    API: "https://pokeapi.co/api/v2/pokemon/",
    value: "",

    init: () => {
        console.log("testwefew")
        document.getElementById("searchButton").addEventListener('click', app.userSearchValue);
        document.getElementById("pokemonMoves").addEventListener('click', app.getMoves);
        document.getElementById("pokemonAbilities").addEventListener('click', app.getAbilities);
        document.getElementById("rightcross").addEventListener('click', app.nextPokemon);
        document.getElementById("leftcross").addEventListener('click', app.backPokemon);
        document.getElementById("botcross").addEventListener('click', app.downSprite);
        document.getElementById("topcross").addEventListener('click', app.upSprite);

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
            newString.push(type.type.name)
        });

        newString = newString.join(', ')
        document.getElementById("type").textContent = `Type: ${newString}`

    },

    getMoves: () => {
        let stats = document.getElementById("moves");
        let list = document.createElement("ul")
        list.id = "moveList"
        stats.appendChild(list)
        for (let i = 0; i < app.pokemonMoves.length; i++) {
            let moves = document.createElement("li")
            list.appendChild(moves)
            moves.textContent = `${app.pokemonMoves[i].move.name}`
        }
    },

    clearMoves: () => {
        let moveList = document.getElementById('moveList');
        if (moveList) {
            moveList.remove()
        }

    },

    getAbilities: () => {
        for (let i = 0; i < app.pokemonAbilities.length; i++) {
            console.log(app.pokemonAbilities[i].ability.name)
        }
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

                document.getElementById("id").textContent = `ID: ${data.id}`
                document.getElementById("name").textContent = `Name: ${data.name}`

                app.pokemonMoves = data.moves;
                app.pokemonAbilities = data.abilities;
                app.pokemonTypes = data.types
                app.currentPokemon = data.id

                app.getSprites(data);
                app.getTypes()

                document.getElementById("pokePic").src = app.pokemonSprites[0]
                console.log("this is line 130" + app.pokemonSprites)
            })
            .catch((err) => {
                console.log("we have hit an error!!")
            })
    },

    getSprites: (data) => {
        app.pokemonSprites = []
        console.log(app.pokemonSprites)
        app.pokemonSprites.push(data.sprites.front_default)
        app.pokemonSprites.push(data.sprites.back_default)
        app.pokemonSprites.push(data.sprites.front_shiny)
        app.pokemonSprites.push(data.sprites.back_shiny)

        console.log(app.pokemonSprites)
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
        for (let i = 0; i < app.pokemonAbilities.length; i++) {
            console.log(app.pokemonAbilities[i].ability.name);
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

    displayPokemon: () => {
        fetch(`${app.API}${app.currentPokemon}`)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("pokePic").src = data.sprites.front_default;
                document.getElementById("id").textContent = `ID #: ${data.id}`;
                document.getElementById("name").textContent = `Name: ${
          data.name[0].toUpperCase() + data.name.slice(1)
        }`;

                app.pokemonMoves = data.moves;
                app.pokemonAbilities = data.abilities;
                app.pokemonTypes = data.types;
                app.pokemonSprites = data.sprites;
                app.currentPokemon = data.id;

                app.getTypes();
            })
            .catch((err) => {
                console.log("we have hit an error!!");
            });
    },

};

document.addEventListener("DOMContentLoaded", app.init);