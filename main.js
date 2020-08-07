const app = {

    userSearch: "",
    pokemonMoves: [],
    pokemonAbilities: [],
    pokemonTypes: [],
    
     init: () => {
        console.log("test")
        document.getElementById("searchButton").addEventListener('click', app.userSearchValue);
        document.getElementById("pokemonMoves").addEventListener('click', app.getMoves);
        document.getElementById("pokemonAbilities").addEventListener('click', app.getAbilities);
     },

     userSearchValue: () => {
        let searchValue = document.getElementById("myText").value
        app.userSearch = searchValue;
        console.log(app.userSearch)
        app.pickPokemon()
     },

     newSearch: () =>{
        app.userSearch = "";
        searchValue.value = "";
        app.pokemonMoves = [];
        app.pokemonAbilities = [];
        document.getElementById("myText").value = "";
     },

     pickPokemon: () =>{
        console.log("We are looking for the pokemon now!")

        fetch(`https://pokeapi.co/api/v2/pokemon/${app.userSearch}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("pokePic").src = data.sprites.front_default
                document.getElementById("id").textContent = `ID: ${data.id}`
                document.getElementById("name").textContent = `Name: ${data.name}`
                document.getElementById("type").textContent = `Type: ${data.types[0].type.name}`
                app.pokemonMoves = data.moves;
                app.pokemonAbilities = data.abilities;
                app.pokemonTypes = data.types

                app.getTypes()
            })
            .catch((err) =>{
                console.log("we have hit an error!!")
            })
     },

     getTypes: () =>{
        console.log("getting pokemon types")
        
        let newString = [];
        app.pokemonTypes.forEach(type => {
            newString.push(type.type.name)
        });

        newString = newString.join(', ')
        console.log(newString)
     },

     getMoves: () =>{
        for (let i = 0; i < app.pokemonMoves.length; i++) {
            console.log(app.pokemonMoves[i].move.name)          
        }
     },

     getAbilities: () =>{
         for (let i = 0; i < app.pokemonAbilities.length; i++) {
             console.log(app.pokemonAbilities[i].ability.name)
         }
     }




};

document.addEventListener('DOMContentLoaded', app.init);
