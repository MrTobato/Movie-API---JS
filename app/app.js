const API_KEY = "39cde392-c0e9-45f4-adc1-8a19bf390859";
const API_URL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL);

// Подключаем АPI
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

// Цвет border-radius в зависимости от рейтинга
function getClassByRate(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate > 5) {
    return "orange";
  } else {
    return "red";
  }
}

//Показываемя карточки с фильмами
function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдуище фильмы после запроса на поиск.
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
        <div class="card">
            <div class="img-block">
                <img
                    src="${movie.posterUrlPreview}"
                    class="poster"
                    alt='${movie.nameRu}'
                 />
          <div class="img-block-darkened"></div>
        </div>
        <div class="info">
          <div class="movie-title">${movie.nameRu}</div>
          <div class="genre">${movie.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>
        ${
          movie.rating &&
          `
        <div class="rating rating-${getClassByRate(movie.rating)}">${
            movie.rating
          }</div>
            `
        }
        </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".search");

// API на поиск фильмов
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': '39cde392-c0e9-45f4-adc1-8a19bf390859',
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))
