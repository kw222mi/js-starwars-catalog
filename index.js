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

    let html = "<h2 class='char-h2'>Characters </h2> <ul class='char-ul'>";
    slicedCharacterArray.map((char, index) => {
      html += `<li><a href="#" class="char-link" data-index="${index}">${char.name}</a><span id='arrow'class="material-symbols-outlined">
arrow_right
</span></li>`;
    });
    html += "</ul>";

    // Add pagination controls
    const paginationHTML = `
            <div class="pagination">

                <button class="prev-btn"${
                  currentPage === 1 ? "disabled" : ""
                }><span class="material-symbols-outlined">
                  chevron_left
                  </span></button>
                <span class="page-info">${start + 1}-${Math.min(
      end,
      numberOfCharacters
    )} / ${numberOfCharacters}</span>
                <button class="next-btn" ${
                  end >= numberOfCharacters ? "disabled" : ""
                }><span class="material-symbols-outlined">
                    chevron_right
                    </span></button>

            </div>
         `;

    charDiv.innerHTML = html + paginationHTML;

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const charList = document.querySelector(".char-ul");

    charList.addEventListener("click", (e) => {
      let index = e.target.attributes[2].value;
      console.log(index);
      clearDetails();
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

const clearDetails = () => {
  let charDetails = document.querySelector(".char-info");
  charDetails.innerHTML = "";
  let planetDetails = document.querySelector(".planet-info");
  planetDetails.innerHTML = "";
};

const renderDetails = async (char) => {
  let charDetails = document.querySelector(".char-info");
  console.log(char.name);

  const detailsHTML = `
  <div>
    <h3>${char.name} </h3>
    
    <p><span>Height: </span>${char.height} <span>cm<span></p>
    <p><span>Mass: </span>${char.mass} <span>kg<span></p>
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
    <h3>${planet.name} </h3>
    <p><span>Terrain: </span>${planet.terrain}</p>
    <p><span>Diameter: </span>${planet.diameter}</p>
    <p><span>Rotation period: </span>${planet.rotation_period}</p> 
    <p><span>Population: </span>${planet.population}</p>
    <p><span>Orbital period: </span>${planet.orbital_period}</p>
    <p><span>Climate: </span>${planet.climate}</p>
    <p><span>Gravity: </span>${planet.gravity}</p>
  `;

  planetDetails.innerHTML = planetHTML;
};

charactersObject = await getCharacter("https://swapi.dev/api/people/");
charactersArr = charactersObject.results;
displayCharactersResult(charactersObject);
