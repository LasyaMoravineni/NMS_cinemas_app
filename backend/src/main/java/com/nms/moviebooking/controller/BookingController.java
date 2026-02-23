package com.nms.moviebooking.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nms.moviebooking.dto.BookingRequestDTO;
import com.nms.moviebooking.dto.BookingResponseDTO;
import com.nms.moviebooking.service.BookingService;


@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public BookingResponseDTO bookTickets(
            @RequestBody BookingRequestDTO dto) {
        return bookingService.bookTickets(dto);
    }
    @GetMapping("/user/{userId}")
    public List<BookingResponseDTO> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }

    @GetMapping("/show/{showId}/seats")
    public List<String> getBookedSeats(@PathVariable Long showId) {
        return bookingService.getBookedSeatsByShow(showId);
    }
    
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(
            @PathVariable("bookingId") Long bookingId,
            @RequestParam("userId") Long userId) {

        bookingService.cancelBooking(bookingId, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Booking cancelled successfully");
        

        return ResponseEntity.ok(response);
    }
    
}
