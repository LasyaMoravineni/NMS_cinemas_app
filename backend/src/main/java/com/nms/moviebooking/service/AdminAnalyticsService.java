package com.nms.moviebooking.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nms.moviebooking.dto.AdminAnalyticsDTO;
import com.nms.moviebooking.dto.MoviePerformanceDTO;
import com.nms.moviebooking.dto.RevenuePerMovieDTO;
import com.nms.moviebooking.dto.RevenueTrendDTO;
import com.nms.moviebooking.dto.TheatreOccupancyDTO;
import com.nms.moviebooking.model.Booking;
import com.nms.moviebooking.model.Show;
import com.nms.moviebooking.model.Theatre;
import com.nms.moviebooking.repository.BookingRepository;
import com.nms.moviebooking.repository.ShowRepository;


@Service
public class AdminAnalyticsService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    public AdminAnalyticsDTO getAnalytics() {

        AdminAnalyticsDTO dto = new AdminAnalyticsDTO();

        long totalBookings = bookingRepository.count();
        long totalShows = showRepository.count();

        double totalRevenue = bookingRepository.findAll()
                .stream()
                .mapToDouble(b -> b.getTotalAmount())
                .sum();

        String mostBookedMovie = bookingRepository.findMostBookedMovie()
                .stream()
                .findFirst()
                .orElse("N/A");

        double averageTicketValue = totalBookings > 0
                ? totalRevenue / totalBookings
                : 0;

        // Occupancy Rate
        double totalOccupancyPercent = 0;
        int countedShows = 0;

        for (Show show : showRepository.findAll()) {

        List<Booking> showBookings =
                bookingRepository.findByShowShowId(show.getShowId());

        double bookedSeats = showBookings.stream()
                .mapToDouble(Booking::getSeatsBooked)
                .sum();

        double totalCapacity =
                bookedSeats + show.getAvailableSeats();

        if (totalCapacity > 0) {
                double showOccupancy =
                        (bookedSeats / totalCapacity) * 100;

                totalOccupancyPercent += showOccupancy;
                countedShows++;
        }
        }

        double occupancyRate = countedShows > 0
                ? totalOccupancyPercent / countedShows
                : 0;

        occupancyRate = Math.round(occupancyRate * 10.0) / 10.0;



        // Revenue Trend (per day)
        Map<LocalDate, Double> revenueMap = bookingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        b -> b.getBookingTime().toLocalDate(),
                        Collectors.summingDouble(b -> b.getTotalAmount())
                ));

        List<RevenueTrendDTO> revenueTrend = revenueMap.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> new RevenueTrendDTO(e.getKey(), e.getValue()))
                .toList();

        // Movie Performance
        Map<String, Long> movieMap = bookingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        b -> b.getShow().getMovie().getTitle(),
                        Collectors.counting()
                ));

        List<MoviePerformanceDTO> moviePerformance = movieMap.entrySet()
                .stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .map(e -> new MoviePerformanceDTO(e.getKey(), e.getValue()))
                .toList();

        //Revenue per movie
        Map<String, Double> revenuePerMovieMap = bookingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        b -> b.getShow().getMovie().getTitle(),
                        Collectors.summingDouble(b -> b.getTotalAmount())
                ));

        List<RevenuePerMovieDTO> revenuePerMovie = revenuePerMovieMap.entrySet()
                .stream()
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .map(e -> new RevenuePerMovieDTO(e.getKey(), e.getValue()))
                .toList();


        //Top Performing Theatre (Highest Revenue)
        Map<String, Double> theatreRevenueMap = bookingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        b -> b.getShow().getTheatre().getName() + 
                        " - " + 
                        b.getShow().getTheatre().getLocation(),
                        Collectors.summingDouble(b -> b.getTotalAmount())
                ));

        String topTheatre = theatreRevenueMap.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        

        //Theatre Occupancy Rate
        Map<Long, List<Show>> showsByTheatre = showRepository.findAll()
        .stream()
        .collect(Collectors.groupingBy(
                s -> s.getTheatre().getTheatreId()
        ));

        List<TheatreOccupancyDTO> theatreOccupancyList = new ArrayList<>();

        for (List<Show> shows : showsByTheatre.values()) {

        Theatre theatre = shows.get(0).getTheatre();

        double totalBookedSeats = 0;
        double totalCapacity = 0;

        for (Show show : shows) {

                double bookedSeats = bookingRepository
                        .findByShowShowId(show.getShowId())
                        .stream()
                        .mapToDouble(Booking::getSeatsBooked)
                        .sum();

                totalBookedSeats += bookedSeats;

                double showCapacity = bookedSeats + show.getAvailableSeats();
                totalCapacity += showCapacity;
        }

        double occupancy = totalCapacity > 0
                ? (totalBookedSeats / totalCapacity) * 100
                : 0;

        occupancy = Math.round(occupancy * 10.0) / 10.0;

        theatreOccupancyList.add(
                new TheatreOccupancyDTO(
                        theatre.getName(),
                        theatre.getLocation(),
                        occupancy
                )
        );
        }



        


        dto.setTotalBookings(totalBookings);
        dto.setTotalRevenue(totalRevenue);
        dto.setTotalShows(totalShows);
        dto.setMostBookedMovie(mostBookedMovie);
        dto.setAverageTicketValue(averageTicketValue);
        dto.setOccupancyRate(occupancyRate);
        dto.setRevenueTrend(revenueTrend);
        dto.setMoviePerformance(moviePerformance);
        dto.setRevenuePerMovie(revenuePerMovie);
        dto.setTopPerformingTheatre(topTheatre);
        dto.setTheatreOccupancy(theatreOccupancyList);

        return dto;
    }
}
