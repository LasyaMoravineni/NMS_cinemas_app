if (!sessionStorage.getItem("adminLoggedIn")) {
    window.location.href = "admin-login.html";
}


const API_URL = "/api/movies";
const THEATRE_API = "/api/theatres";
const SHOW_API = "/api/shows";


document.addEventListener("DOMContentLoaded", () => {
    loadMovies();
    loadTheatres();
    loadShowFormData();
    loadShows();

});


function loadMovies() {
    fetch(API_URL)
        .then(res => res.json())
        .then(movies => {
            const list = document.getElementById("movie-list");
            list.innerHTML = "";
            movies.forEach(m => {
                list.innerHTML += `
                    <div class="movie-card">
                        <img src="${m.posterUrl || 'https://via.placeholder.com/200x300?text=No+Poster'}" class="poster">
                        <h3>${m.title}</h3>
                        <p>${m.genre} | ${m.language}</p>
                        <p>${m.duration} mins</p>
                        <button onclick='editMovie(${JSON.stringify(m)})'>Edit</button>
                        <button onclick='deleteMovie(${m.movieId})'>Delete</button>
                    </div>
                `;
            });
        });
}

function loadTheatres() {
    fetch(THEATRE_API)
        .then(res => res.json())
        .then(theatres => {
            const list = document.getElementById("theatre-list");
            list.innerHTML = "";

            theatres.forEach(t => {
                list.innerHTML += `
                    <div class="theatre-card">
                        <h3>${t.name}</h3>
                        <p>${t.location}</p>
                        <button onclick='editTheatre(${JSON.stringify(t)})'>Edit</button>
                        <button onclick='deleteTheatre(${t.theatreId})'>Delete</button>
                    </div>
                `;
            });
        });
}

// Movies section
function editMovie(movie) {
    document.getElementById("posterUrl").value = movie.posterUrl || "";

    document.getElementById("movieId").value = movie.movieId;
    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("language").value = movie.language;
    document.getElementById("duration").value = movie.duration;
}

function saveMovie() {
    const id = document.getElementById("movieId").value;
    const error = document.getElementById("movieError");
    error.textContent = "";

     if (!posterUrl.value.trim()) {
        error.textContent = "Poster URL is required";
        return;
    }
    if (!title.value.trim()) {
        error.textContent = "Title is required";
        return;
    }
    if (!genre.value.trim()) {
        error.textContent = "Genre is required";
        return;
    }
    if (!language.value.trim()) {
        error.textContent = "Language is required";
        return;
    }
    if (!duration.value || duration.value <= 0) {
        error.textContent = "Duration must be a positive number";
        return;
    }

    const movie = {
        posterUrl: document.getElementById("posterUrl").value,
        title: title.value,
        genre: genre.value,
        language: language.value,
        duration: duration.value,
        isUpcoming: false
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    }).then(() => {
        clearForm();
        loadMovies();
    });
}

function deleteMovie(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadMovies());
}

function clearForm() {
    movieId.value = "";
    posterUrl.value = "";
    title.value = "";
    genre.value = "";
    language.value = "";
    duration.value = "";
    document.getElementById("movieError").textContent = "";

    
}



// Theatres section

function addTheatre() {
    const name = document.getElementById("theatreName").value;
    const location = document.getElementById("location").value;

    if (!name || !location) {
        alert("Please enter both theatre name and location");
        return;
    }

    fetch("/api/theatres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to add theatre");
        }
        return res.json();
    })
    .then(data => {
        alert(data.message); 
        theatreName.value = "";
        location.value = "";
    })
    .catch(err => {
        alert("Error adding theatre. Check backend.");
        console.error(err);
    });
}

function saveTheatre() {
    const id = document.getElementById("theatreId").value;
    const error = document.getElementById("theatreError");
    error.textContent = "";

    const nameInput = document.getElementById("theatreName");
    const locationInput = document.getElementById("location");

    if (!nameInput.value.trim()) {
        error.textContent = "Theatre name is required";
        return;
    }

    if (!locationInput.value.trim()) {
        error.textContent = "Location is required";
        return;
    }


    const theatre = {
        name: nameInput.value,
        location: locationInput.value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${THEATRE_API}/${id}` : THEATRE_API;

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theatre)
    })
    .then(async res => {
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Failed to save theatre");
        }
        return res.json();
    })
    .then(() => {
        clearTheatreForm();
        loadTheatres();
        alert(id ? "Theatre updated successfully" : "Theatre added successfully");
    })
    .catch(err => {
        error.textContent = err.message || "Error saving theatre";
    });
}


function editTheatre(theatre) {
    document.getElementById("theatreId").value = theatre.theatreId;
    document.getElementById("theatreName").value = theatre.name;
    document.getElementById("location").value = theatre.location;
}


function deleteTheatre(id) {
    fetch(`${THEATRE_API}/${id}`, { method: "DELETE" })
        .then(() => {
            loadTheatres();
            alert("Theatre deleted successfully");
        });
}

function clearTheatreForm() {
    document.getElementById("theatreId").value = "";
    document.getElementById("theatreName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("theatreError").textContent = "";
}


// Shows section

function loadShowFormData() {
    fetch(API_URL)
        .then(res => res.json())
        .then(movies => {
            const select = document.getElementById("showMovie");
            select.innerHTML = "<option value=''>Select Movie</option>";
            movies.forEach(m =>
                select.innerHTML += `<option value="${m.movieId}">${m.title}</option>`
            );
        });

    fetch(THEATRE_API)
        .then(res => res.json())
        .then(theatres => {
            const select = document.getElementById("showTheatre");
            select.innerHTML = "<option value=''>Select Theatre</option>";
            theatres.forEach(t =>
                select.innerHTML += `<option value="${t.theatreId}">${t.name}</option>`
            );
        });
}

function saveShow() {
    const id = document.getElementById("showId").value;
    const error = document.getElementById("showError");
    error.textContent = "";

    if (!showMovie.value || !showTheatre.value || !showTime.value ||
        !showPrice.value || !showSeats.value) {
        error.textContent = "All fields are required";
        return;
    }

    const payload = {
        movieId: showMovie.value,
        theatreId: showTheatre.value,
        showTime: showTime.value,
        price: showPrice.value,
        availableSeats: showSeats.value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/shows/${id}` : "/api/shows";

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert(id ? "Show updated successfully" : "Show added successfully");
        clearShowForm();
        loadShows();
    })
    .catch(() => error.textContent = "Failed to save show");
}


function loadShows() {
    fetch(SHOW_API)
        .then(res => res.json())
        .then(shows => {
            const list = document.getElementById("show-list");
            list.innerHTML = "";

            shows.forEach(s => {
                list.innerHTML += `
                        <div class="theatre-card">
                            <h3>${s.movie.title}</h3>
                            <p>${s.theatre.name}</p>
                            <p>${new Date(s.showTime).toLocaleString()}</p>
                            <p>₹${s.price}</p>
                            <p>Seats: ${s.availableSeats}</p>

                            <button onclick='editShow(${JSON.stringify(s)})'>Edit</button>
                            <button onclick='deleteShow(${s.showId})'>Delete</button>
                        </div>
                `;
            });
        });
}

function editShow(show) {
    document.getElementById("showId").value = show.showId;
    document.getElementById("showMovie").value = show.movie.movieId;
    document.getElementById("showTheatre").value = show.theatre.theatreId;

    document.getElementById("showTime").value =
        show.showTime.substring(0, 16); // datetime-local format

    document.getElementById("showPrice").value = show.price;
    document.getElementById("showSeats").value = show.availableSeats;
}



function deleteShow(id) {
    if (!confirm("Delete this show?")) return;

    fetch(`${SHOW_API}/${id}`, { method: "DELETE" })
        .then(() => {
            alert("Show deleted");
            loadShows();
        });
}

function clearShowForm() {
    showId.value = "";
    showMovie.value = "";
    showTheatre.value = "";
    showTime.value = "";
    showPrice.value = "";
    showSeats.value = "";
    showError.textContent = "";
}

