const app = {

    userSearch: "",
    pokemonMoves: [],
    pokemonAbilities: [],
    pokemonTypes: [],
    currentSprite: "",
    pokemonSprites: [],
    currentPokemon: "",
    API: "https://pokeapi.co/api/v2/pokemon/",

    init: () => {
        console.log("test")
        document.getElementById("searchButton").addEventListener('click', app.userSearchValue);
        document.getElementById("pokemonMoves").addEventListener('click', app.getMoves);
        document.getElementById("pokemonAbilities").addEventListener('click', app.getAbilities);
        document.getElementById("rightcross").addEventListener('click', app.nextPokemon);
        document.getElementById("leftcross").addEventListener('click', app.backPokemon);

    },

    // to do
    // add error handler if user puts in a pokemon that does not exist.
    userSearchValue: () => {
        let searchValue = document.getElementById("myText").value
        app.userSearch = searchValue.toLowerCase().trim();
        console.log("this is what the user is searching for " + app.userSearch)
        document.getElementById("myText").value = "";
        app.searchPokemon()
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
        stats.appendChild(list)
        for (let i = 0; i < app.pokemonMoves.length; i++) {
            console.log(app.pokemonMoves[i].move.name)
            let moves = document.createElement("li")
            list.appendChild(moves)
            moves.textContent = `${app.pokemonMoves[i].move.name}`
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
    },

    backPokemon: () => {
            console.log("go back one pokemon")
            app.currentPokemon = app.currentPokemon - 1
            app.displayPokemon()
    },

    displayPokemon: () => {

        fetch(`${app.API}${app.currentPokemon}`)
            .then(response => response.json())
            .then(data => {

                document.getElementById("pokePic").src = data.sprites.front_default
                document.getElementById("id").textContent = `ID: ${data.id}`
                document.getElementById("name").textContent = `Name: ${data.name}`

                app.pokemonMoves = data.moves;
                app.pokemonAbilities = data.abilities;
                app.pokemonTypes = data.types
                app.pokemonSprites = data.sprites
                app.currentPokemon = data.id

                app.getTypes()
            })
            .catch((err) => {
                console.log("we have hit an error!!")
            })


    }



};

document.addEventListener('DOMContentLoaded', app.init);