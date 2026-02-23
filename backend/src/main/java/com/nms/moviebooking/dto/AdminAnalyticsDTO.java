package com.nms.moviebooking.dto;

import java.util.List;

public class AdminAnalyticsDTO {

    private long totalBookings;
    private double totalRevenue;
    private long totalShows;
    private String mostBookedMovie;

    private double averageTicketValue;
    private double occupancyRate;

    private List<RevenueTrendDTO> revenueTrend;
    private List<MoviePerformanceDTO> moviePerformance;
    private String topPerformingTheatre;
    private List<RevenuePerMovieDTO> revenuePerMovie;

    private List<TheatreOccupancyDTO> theatreOccupancy;



    public AdminAnalyticsDTO() {}

    public AdminAnalyticsDTO(long totalBookings, double totalRevenue,
                             long totalShows, String mostBookedMovie) {
        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.totalShows = totalShows;
        this.mostBookedMovie = mostBookedMovie;
    }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getTotalShows() { return totalShows; }
    public void setTotalShows(long totalShows) { this.totalShows = totalShows; }

    public String getMostBookedMovie() { return mostBookedMovie; }
    public void setMostBookedMovie(String mostBookedMovie) { this.mostBookedMovie = mostBookedMovie; }

    public double getAverageTicketValue() { return averageTicketValue; }
    public void setAverageTicketValue(double averageTicketValue) { this.averageTicketValue = averageTicketValue; }

    public double getOccupancyRate() { return occupancyRate; }
    public void setOccupancyRate(double occupancyRate) { this.occupancyRate = occupancyRate; }

    public List<RevenueTrendDTO> getRevenueTrend() { return revenueTrend; }
    public void setRevenueTrend(List<RevenueTrendDTO> revenueTrend) { this.revenueTrend = revenueTrend; }

    public List<MoviePerformanceDTO> getMoviePerformance() { return moviePerformance; }
    public void setMoviePerformance(List<MoviePerformanceDTO> moviePerformance) { this.moviePerformance = moviePerformance; }

    public List<RevenuePerMovieDTO> getRevenuePerMovie() {
        return revenuePerMovie;
    }

    public void setRevenuePerMovie(List<RevenuePerMovieDTO> revenuePerMovie) {
        this.revenuePerMovie = revenuePerMovie;
    }

    public String getTopPerformingTheatre() {
        return topPerformingTheatre;
    }

    public void setTopPerformingTheatre(String topPerformingTheatre) {
        this.topPerformingTheatre = topPerformingTheatre;
    }


    public void setTheatreOccupancy(List<TheatreOccupancyDTO> theatreOccupancy) {
        this.theatreOccupancy = theatreOccupancy;
    }

    public List<TheatreOccupancyDTO> getTheatreOccupancy() {
        return theatreOccupancy;
    }
    
}
