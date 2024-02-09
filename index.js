let charactersArr = [];
let charactersObject;
let numberOfCharacters;
const itemsPerPage = 6;
let currentPage = 1;
const charDiv = document.getElementById("character-container");

const getCharacter = async (url) => {
  try {
    const response = await fetch(url);
    charactersObject = await response.json();
    console.log(charactersObject);
    //console.log(charactersObject.results);
    //console.log(charactersObject.results[0]);

    return charactersObject;
  } catch (error) {
    console.error(error);
  }
};

const displayCharactersResult = async (charactersObject) => {
  numberOfCharacters = charactersObject.count;

  const renderCharacters = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedCharacterArray = charactersArr.slice(start, end);

    let html = "<ul class='char-ul'>";
    slicedCharacterArray.map((char, index) => {
      html += `<li><a href="#" class="char-link" data-index="${index}">${char.name}</a></li>`;
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

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const charList = document.querySelector(".char-ul");

    charList.addEventListener("click", (e) => {
      let index = e.target.attributes[2].value;
      console.log(index);
      renderDetails(slicedCharacterArray[index]);
    });

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderCharacters();
      }
    });

    nextBtn.addEventListener("click", async () => {
      if (end < numberOfCharacters) {
        currentPage++;
        console.log(end);
        if (end + 6 > charactersObject.results.length) {
          let nextCharacters = await getCharacter(charactersObject.next);
          charactersObject = nextCharacters;
          charactersArr = charactersArr.concat(nextCharacters.results);
        }
        renderCharacters();
      }
    });
  };

  renderCharacters();
};

const renderDetails = async (char) => {
  let charDetails = document.querySelector(".char-info");
  console.log(char.name);

  const detailsHTML = `
  <div>
    <p><span>Name: </span>${char.name}</p>
    <p><span>Height: </span>${char.height}</p>
    <p><span>Mass: </span>${char.mass}</p>
    <p><span>Hair color: </span>${char.hair_color}</p>
    <p><span>Skin color: </span>${char.skin_color}</p>
    <p><span>Eye color: </span>${char.eye_color}</p>
    <p><span>Birth Year: </span>${char.birth_year}</p>
    <p><span>Gender: </span>${char.gender}</p>

  </div>
  `;
  
  charDetails.innerHTML = detailsHTML;

  let planetDetails = document.querySelector(".planet-info");
  let planet = await getCharacter(char.homeworld);
 
  const planetHTML = `
    
  `
};

charactersObject = await getCharacter("https://swapi.dev/api/people/");
charactersArr = charactersObject.results;
displayCharactersResult(charactersObject);
