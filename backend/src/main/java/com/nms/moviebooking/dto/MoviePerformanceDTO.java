package com.nms.moviebooking.dto;

public class MoviePerformanceDTO {

    private String movieTitle;
    private long totalBookings;

    public MoviePerformanceDTO() {}

    public MoviePerformanceDTO(String movieTitle, long totalBookings) {
        this.movieTitle = movieTitle;
        this.totalBookings = totalBookings;
    }

    public String getMovieTitle() { return movieTitle; }
    public void setMovieTitle(String movieTitle) { this.movieTitle = movieTitle; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }
}
