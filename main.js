const app = {

    userSearch: "",
    
     init: () => {
        console.log("test")
        document.getElementById("searchButton").addEventListener('click', app.userSearchValue);
     },

     userSearchValue: () => {
        let searchValue = document.getElementById("myText").value
        app.userSearch = searchValue;
        console.log(app.userSearch)
        app.pickPokemon()
        app.userSearch = "";
        searchValue.value = "";
        document.getElementById("myText").value = "";
     },

     pickPokemon: () =>{
        console.log("We are looking for the pokemon now!")

        fetch(`https://pokeapi.co/api/v2/pokemon/${app.userSearch}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("pokePic").src = data.sprites.front_default
                document.getElementById("name").textContent = `Name: ${data.name}`
                document.getElementById("type").textContent = `Type: ${data.types[0].type.name}`
                document.getElementById("height")
                document.getElementById("weight")

            })
            .catch((err) =>{
                console.log("we have hit an error!!")
            })
     }
};

document.addEventListener('DOMContentLoaded', app.init);
