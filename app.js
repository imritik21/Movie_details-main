let searchform = document.querySelector("form");
let moviecontainer = document.querySelector(".movie-container");
let input = document.querySelector("input");

const baseURL = "https://www.omdbapi.com/?apikey=82c77865&t=";

function updateInfo(actual_data) {
    // initially, make empty
    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove("noBackground");

    // destructuring
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = actual_data;

    // movie info
    const movie_element = document.createElement("div");

    // movie element css
    movie_element.classList.add("movie-info");

    movie_element.innerHTML = `<h1>${Title}</h1>
                               <p><strong>Rating : &#11088</strong> ${imdbRating}</p>`;

    // movie genre details
    const movieGenreElement = document.createElement("div");
    // its css
    movieGenreElement.classList.add("movie-genre");
    Genre.split(", ").forEach(element => {
        const genre = document.createElement("p");
        genre.innerText = element;
        movieGenreElement.appendChild(genre);
    });

    // add genre to movie_element
    movie_element.appendChild(movieGenreElement);
    movie_element.innerHTML += `<p><strong>Released Date : </strong>${Released}</p>
                                <p><strong>Duration : </strong>${Runtime}</p>
                                <p><strong>Actors : </strong>${Actors}</p>
                                <p><strong>Plot : </strong>${Plot}</p>`;

    // Now add poster
    const movieposter = document.createElement("div");
    movieposter.classList.add("movieposter");
    movieposter.innerHTML = `<img src="${Poster}" alt="${Title} Poster">`;

    // append poster first
    moviecontainer.appendChild(movieposter);

    // append movie info
    moviecontainer.appendChild(movie_element);
}

async function getmoviedetails(movie) {
    try {
        let apiUrl = `${baseURL}${movie}`;
        let response = await fetch(apiUrl);
        let actual_data = await response.json();
        if (actual_data.Response === "False") {
            throw new Error(actual_data.Error);
        }
        updateInfo(actual_data);
    } catch (er) {
        console.log(er);
        let message = "Please enter a correct movie name to get movie information";
        showerror(message);
    }
}

function showerror(message) {
    moviecontainer.innerHTML = `<h1>${message}</h1>`;
    moviecontainer.classList.add("noBackground");
}

searchform.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let moviename = input.value.trim();
    console.log(moviename);
    if (moviename !== '') {
        showerror("Fetching movie details...");
        getmoviedetails(moviename);
    } else {
        moviecontainer.innerHTML = `<h1>Please enter a movie name to get movie information</h1>`;
        moviecontainer.classList.add("noBackground");
    }
});
