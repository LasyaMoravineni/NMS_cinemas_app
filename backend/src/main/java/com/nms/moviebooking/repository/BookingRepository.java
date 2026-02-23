package com.nms.moviebooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nms.moviebooking.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserUserId(Long userId);
    List<Booking> findByShowShowId(Long showId);
    @Query("""
    SELECT b.show.movie.title
    FROM Booking b
    GROUP BY b.show.movie.title
    ORDER BY COUNT(b.bookingId) DESC
    """)
    List<String> findMostBookedMovie();
}
