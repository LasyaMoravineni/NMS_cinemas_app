const MOVIE_API = "/api/movies";

function goToLogin() {
    window.location.href = "user-login.html";
}


let allMovies = [];
const searchInput = document.querySelector(".search-bar");

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(keyword)
    );

    renderMovies(filtered);
});


document.addEventListener("DOMContentLoaded", loadMovies);

function loadMovies() {
    fetch(MOVIE_API)
        .then(res => res.json())
        .then(movies => {
            allMovies = movies;   // store full list
            renderMovies(movies);
        });
}


function viewMovie(id) {
    window.location.href = `movie.html?id=${id}`;
}


function applyFilters() {
    const genre = document.getElementById("genreFilter").value;
    const language = document.getElementById("languageFilter").value;

    // No filters → load all movies
    if (!genre && !language) {
        loadMovies();
        return;
    }

    // If both selected → filter on frontend (simplest + reliable)
    fetch("/api/movies")
        .then(res => res.json())
        .then(movies => {
            let filtered = movies;

            if (genre) {
                filtered = filtered.filter(m => m.genre === genre);
            }
            if (language) {
                filtered = filtered.filter(m => m.language === language);
            }

            renderMovies(filtered);
        });
}

//Upcoming movies
let showingUpcoming = false;

function loadUpcoming() {
    if (!showingUpcoming) {
        fetch("/api/movies/upcoming")
            .then(res => res.json())
            .then(movies => {
                renderMovies(movies);
                document.getElementById("upcomingBtn").textContent = "Show All";
                showingUpcoming = true;
            });
    } else {
        renderMovies(allMovies);
        document.getElementById("upcomingBtn").textContent = "Upcoming Movies";
        showingUpcoming = false;
    }
}


function renderMovies(movies) {
    const container = document.getElementById("movie-list");
    container.innerHTML = "";

    if (!movies.length) {
        container.innerHTML = "<p style='text-align:center;color:#aaa'>No movies found</p>";
        return;
    }
    
    movies.forEach(m => {
        container.innerHTML += `
            <div class="movie-card" onclick="viewMovie(${m.movieId})">
                        <img class="poster" 
                            src="${m.posterUrl || 'https://via.placeholder.com/220x300?text=No+Poster'}">
                        <h3>${m.title}</h3>
                        <p>${m.genre} | ${m.language}</p>
                        <p>${m.duration} mins</p>
                    </div>
        `;
    });
}

