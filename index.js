const getCharacter = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const characters = await response.json();
    console.log(characters);
    displayCharactersResult(characters);
  } catch (error) {
    console.error(error);
  }
};

const displayCharactersResult = async (characters) => {
  const numberOfCharacters = characters.results.length;
  const itemsPerPage = 6;
  const currentPage = 1;
  const charDiv = document.getElementById("character-container");

  const renderCharacters = () => {
    console.log(characters.results);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedCharacterArray = characters.results.slice(start, end);

    let html = "<ul>";
    slicedCharacterArray.forEach((char) => {
      html += `<li><a href="#" class="char-link" data-id="${char.id}">${char.name}</a></li>`;
    });
    html += "</ul>";

    // Add pagination controls
    const paginationHTML = `
            <div class="pagination">

                <button class="prev-btn"${
                  currentPage === 1 ? "disabled" : ""
                }>Prev</button>
                <span class="page-info">${start + 1}-${Math.min(
      end,
      numberOfCharacters
    )} / ${numberOfCharacters}</span>
                <button class="next-btn" ${
                  end >= numberOfCharacters ? "disabled" : ""
                }>Next</button>

            </div>
         `;

    charDiv.innerHTML = html + paginationHTML;
  };

  renderCharacters();
};

getCharacter();
