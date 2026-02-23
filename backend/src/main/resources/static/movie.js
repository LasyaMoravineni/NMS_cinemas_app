const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
    alert("Invalid movie");
    window.location.href = "index.html";
}

/* ================= MOVIE DETAILS ================= */

fetch(`/api/movies/${movieId}`)
    .then(res => res.json())
    .then(movie => {
        document.getElementById("movie-details").innerHTML = `
            <div class="movie-poster">
                <img src="${movie.posterUrl || 'https://via.placeholder.com/260x380?text=No+Poster'}">
            </div>

            <div class="movie-info">
                <h1>${movie.title}</h1>
                <p class="meta">${movie.genre} • ${movie.language}</p>
                <p>${movie.duration} mins</p>
                <p class="description">
                    Experience the movie in theatres near you.
                </p>
            </div>
        `;
    });



/* ================= SHOWS / THEATRES ================= */
fetch(`/api/shows/movie/${movieId}`)
    .then(res => res.json())
    .then(shows => {
        const div = document.getElementById("theatres");
        div.innerHTML = "";

        if (shows.length === 0) {
            div.innerHTML = "<p>No shows available for this movie.</p>";
            return;
        }

        shows.forEach(s => {
            div.innerHTML += `
                <div class="theatre-card">
                    <h3>${s.theatre.name}</h3>
                    <p>${s.theatre.location}</p>
                    <p>${new Date(s.showTime).toLocaleString()}</p>
                    <p><strong>₹${s.price}</strong></p>
                    <button onclick="book(${s.showId})">Book</button>
                </div>
            `;
        });
    });

function book(showId) {
    window.location.href = `booking.html?showId=${showId}`;
}

