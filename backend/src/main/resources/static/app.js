const API_URL = "/api/movies";

document.addEventListener("DOMContentLoaded", loadMovies);

function loadMovies() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("movie-list");
            container.innerHTML = "";
            data.forEach(movie => {
                container.innerHTML += `
                    <div class="movie-card">
                        <h3>${movie.title}</h3>
                        <p>Genre: ${movie.genre}</p>
                        <p>Language: ${movie.language}</p>
                        <p>Duration: ${movie.duration} mins</p>
                        <button onclick="deleteMovie(${movie.movieId})">Delete</button>
                    </div>
                `;
            });
        });
}

function addMovie() {
    const movie = {
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value,
        language: document.getElementById("language").value,
        duration: document.getElementById("duration").value,
        isUpcoming: false
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    })
    .then(() => {
        loadMovies();
        clearInputs();
    });
}

function deleteMovie(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadMovies());
}

function clearInputs() {
    ["title", "genre", "language", "duration"].forEach(id => {
        document.getElementById(id).value = "";
    });
}
