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

    init: () => {
        console.log("test")
        document.getElementById("searchButton").addEventListener('click', app.userSearchValue);
        document.getElementById("pokemonMoves").addEventListener('click', app.getMoves);
        document.getElementById("pokemonAbilities").addEventListener('click', app.getAbilities);
        document.getElementById("rightcross").addEventListener('click', app.nextPokemon);
        document.getElementById("leftcross").addEventListener('click', app.backPokemon);
        document.getElementById("botcross").addEventListener('click', app.downSprite);
        document.getElementById("topcross").addEventListener('click', app.upSprite);

    },

    // to do
    // add error handler if user puts in a pokemon that does not exist.
    userSearchValue: () => {
        let searchValue = document.getElementById("myText").value
        if(searchValue){
            app.userSearch = searchValue.toLowerCase().trim();
            console.log("this is what the user is searching for " + app.userSearch)
            document.getElementById("myText").value = "";
            app.searchPokemon()
        }else{
            console.log("this is the current pokemon " + app.currentPokemon)
            console.log("lookng for nothing")
            app.displayPokemon()
        }
 
    },

    // idk why I wrote this LOL
    // newSearch: () => {
    //     app.userSearch = "";
    //     searchValue.value = "";
    //     app.pokemonMoves = [];
    //     app.pokemonAbilities = [];
    //     document.getElementById("myText").value = "";
    // },

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
        let moves = document.createElement("div");
        moves.id = "moves"
        document.getElementById('stats').appendChild(moves)

        let stats = document.getElementById("moves");
        let list = document.createElement("ul")
        stats.appendChild(list)
        for (let i = 0; i < app.pokemonMoves.length; i++) {
            console.log(app.pokemonMoves[i].move.name)
            let moves = document.createElement("li")
            list.appendChild(moves)
            moves.textContent = `${app.pokemonMoves[i].move.name}`
        }
    },


    // needs fixing
    // clearMoves: () => {
    //     let moves = document.getElementById('moves');
    //     if (moves === moves) {
    //         moves.remove();
    //     }else{
    //     }
    // },

    getAbilities: () => {
        for (let i = 0; i < app.pokemonAbilities.length; i++) {
            console.log(app.pokemonAbilities[i].ability.name)
        }
    },

    nextPokemon: () => {
        console.log("go forward one pokemon!")
        app.currentPokemon = app.currentPokemon + 1
        app.displayPokemon()
        // app.clearMoves()

        console.log(app.currentPokemon)
    },

    backPokemon: () => {
        console.log("go back one pokemon")
        app.currentPokemon = app.currentPokemon - 1
        app.displayPokemon()
        app.clearMoves()
    },

    displayPokemon: () => {
        fetch(`${app.API}${app.currentPokemon}`)
            .then(response => response.json())
            .then(data => {

                document.getElementById("id").textContent = `ID: ${data.id}`
                document.getElementById("name").textContent = `Name: ${data.name}`

                app.pokemonMoves = data.moves;
                app.pokemonAbilities = data.abilities;
                app.pokemonTypes = data.types
                app.currentPokemon = data.id

                app.getSprites(data);
                app.getTypes()

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
                console.log(app.value)
                pokePic.src = app.pokemonSprites[app.value]
            } else {
                app.value--
                console.log("upsprite value " + app.value)
                pokePic.src = '';
                pokePic.src = app.pokemonSprites[app.value]
            }
        }
    }





};

document.addEventListener('DOMContentLoaded', app.init);