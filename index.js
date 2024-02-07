

const getCharacter = async () => {
    const response = await fetch("https://swapi.dev/api/people/");
    const characters = await response.json()
    console.log(characters)
    renderCharacters(characters)
}


const renderCharacters = async (characters) => {
    console.log(characters.results);
    const charDiv = document.getElementById("character-container");
    let element = document.createElement('p')
    charDiv.appendChild(element)
    element.innerText= characters.results[0].name

}


getCharacter()