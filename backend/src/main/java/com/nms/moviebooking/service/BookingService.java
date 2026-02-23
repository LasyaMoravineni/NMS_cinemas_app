package com.nms.moviebooking.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nms.moviebooking.dto.BookingRequestDTO;
import com.nms.moviebooking.dto.BookingResponseDTO;
import com.nms.moviebooking.model.Booking;
import com.nms.moviebooking.model.Show;
import com.nms.moviebooking.model.User;
import com.nms.moviebooking.repository.BookingRepository;
import com.nms.moviebooking.repository.ShowRepository;
import com.nms.moviebooking.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private UserRepository userRepository;

    public BookingResponseDTO bookTickets(BookingRequestDTO dto) {

        // 1️⃣ Fetch Show
        Show show = showRepository.findById(dto.getShowId())
                .orElseThrow(() -> new RuntimeException("Show not found"));

        List<Booking> existingBookings = bookingRepository.findByShowShowId(show.getShowId());

        // Collect already booked seats
        Set<String> bookedSeats = new HashSet<>();

        for (Booking b : existingBookings) {
            if (b.getSeatNumbers() != null) {
                String[] seats = b.getSeatNumbers().split(",");
                bookedSeats.addAll(Arrays.asList(seats));
            }
        }

        // Check for seat conflict
        for (String seat : dto.getSeatNumbers()) {
            if (bookedSeats.contains(seat)) {
                throw new RuntimeException("Seat " + seat + " already booked");
            }
        }


        // 2️⃣ Validate seats
        if (dto.getSeatsBooked() <= 0) {
            throw new RuntimeException("Invalid seat count");
        }

        if (show.getAvailableSeats() < dto.getSeatsBooked()) {
            throw new RuntimeException("Not enough seats available");
        }

        // 3️⃣ Fetch User
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        // 5️⃣ Create Booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShow(show);
        booking.setSeatsBooked(dto.getSeatsBooked());
        booking.setSeatNumbers(String.join(",", dto.getSeatNumbers()));
        booking.setStatus("CONFIRMED");
        booking.setBookingTime(LocalDateTime.now());
        booking.setTotalAmount(
                dto.getSeatsBooked() * show.getPrice()
        );
        

        // 4️⃣ Reduce seats
        show.setAvailableSeats(
                show.getAvailableSeats() - dto.getSeatsBooked()
        );

        // 6️⃣ Save (transactional)
        bookingRepository.save(booking);
        showRepository.save(show);

        // 7️⃣ Response DTO
        BookingResponseDTO response = new BookingResponseDTO();
        response.setBookingId(booking.getBookingId());
        response.setMovieTitle(show.getMovie().getTitle());
        response.setTheatreName(show.getTheatre().getName());
        response.setShowTime(show.getShowTime());
        response.setSeatsBooked(booking.getSeatsBooked());
        response.setSeatNumbers(Arrays.asList(booking.getSeatNumbers().split(",")));
        response.setTotalAmount(booking.getTotalAmount());
        response.setStatus(booking.getStatus());

        return response;
    }

    public List<BookingResponseDTO> getBookingsByUser(Long userId) {

    List<Booking> bookings = bookingRepository.findByUserUserId(userId);

    return bookings.stream().map(b -> {
        BookingResponseDTO dto = new BookingResponseDTO();

        dto.setBookingId(b.getBookingId());
        dto.setMovieTitle(b.getShow().getMovie().getTitle());
        dto.setTheatreName(b.getShow().getTheatre().getName());
        dto.setShowTime(b.getShow().getShowTime());
        dto.setSeatsBooked(b.getSeatsBooked());
        dto.setTotalAmount(b.getTotalAmount());
        dto.setStatus(b.getStatus());

        if (b.getSeatNumbers() != null) {
            dto.setSeatNumbers(
                Arrays.asList(b.getSeatNumbers().split(","))
            );
        }

        return dto;
    }).toList();
}

	public List<String> getBookedSeatsByShow(Long showId) {
	
	    List<Booking> bookings = bookingRepository.findByShowShowId(showId);
	
	    Set<String> bookedSeats = new HashSet<>();
	
	    for (Booking b : bookings) {
	        if (b.getSeatNumbers() != null) {
	            String[] seats = b.getSeatNumbers().split(",");
	            bookedSeats.addAll(Arrays.asList(seats));
	        }
	    }
	
	    return new ArrayList<>(bookedSeats);
	}
	
	@Transactional
	public void cancelBooking(Long bookingId, Long userId) {

	    Booking booking = bookingRepository.findById(bookingId)
	            .orElseThrow(() -> new RuntimeException("Booking not found"));

	    // Security check: user can only cancel their own booking
	    if (!booking.getUser().getUserId().equals(userId)) {
	        throw new RuntimeException("Unauthorized cancellation attempt");
	    }

        if ("CANCELLED".equals(booking.getStatus())) {
            return; // already cancelled
        }


	    Show show = booking.getShow();

	    // Restore seats
	    show.setAvailableSeats(
	            show.getAvailableSeats() + booking.getSeatsBooked()
	    );

	    showRepository.save(show);

        booking.setStatus("CANCELLED");

	    bookingRepository.save(booking);
	}


}
