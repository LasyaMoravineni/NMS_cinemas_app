const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
    window.location.href = "user-login.html";
}

const params = new URLSearchParams(window.location.search);
const showId = params.get("showId");

let seatPrice = 0;
let currentShow = null;


fetch(`/api/shows/${showId}`)
    .then(res => res.json())
    .then(show => {
        seatPrice = show.price;
        currentShow = show;

        document.getElementById("price").textContent = seatPrice;
        document.getElementById("total").textContent = seatPrice;

        document.getElementById("show-info").innerHTML = `
        
            <h1 id="movie-name">${show.movie.title}</h1> <br>
            <div>${show.theatre.name}, ${show.theatre.location}</div>  <br>
            <div>${new Date(show.showTime).toLocaleString()}</div> 
        
        `;
    });

function updateTotal() {
    const seats = document.getElementById("seats").value;
    document.getElementById("total").textContent = seats * seatPrice;
}

function confirmBooking() {
    const seats = document.getElementById("seats").value;

    if (!seats || seats <= 0) {
        document.getElementById("error").textContent = "Invalid seat count";
        return;
    }

    const booking = {
        userId: user.userId,
        showId: showId,
        seatsBooked: seats
    };

    fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        const seats = document.getElementById("seats").value;
    const total = document.getElementById("total").textContent;

    document.querySelector(".booking-container").innerHTML = `
        <div class="booking-card">
            <h2>🎉 Booking Confirmed!</h2>
            <p>Your tickets have been successfully booked.</p>

            <div class="booking-details">
                <p><strong>Movie:</strong> ${currentShow.movie.title}</p>
                <p><strong>Theatre:</strong> ${currentShow.theatre.name}</p>
                <p><strong>Show Date and Time:</strong> ${new Date(currentShow.showTime).toLocaleString()}</p>
                <p><strong>Seats Booked:</strong> ${seats}</p>
                <p><strong>Total Paid:</strong> ₹${total}</p>
            </div>

            <button class="back-btn" onclick="goHome()">Go to Home</button>
        </div>
    `;
    })
    .catch(() => {
        document.getElementById("error").textContent = "Booking failed";
    });
}

function goHome() {
    window.location.href = "index.html";
}

