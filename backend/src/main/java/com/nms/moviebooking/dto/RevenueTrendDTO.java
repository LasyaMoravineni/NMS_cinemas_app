package com.nms.moviebooking.dto;

import java.time.LocalDate;

public class RevenueTrendDTO {

    private LocalDate date;
    private double revenue;

    public RevenueTrendDTO() {}

    public RevenueTrendDTO(LocalDate date, double revenue) {
        this.date = date;
        this.revenue = revenue;
    }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getRevenue() { return revenue; }
    public void setRevenue(double revenue) { this.revenue = revenue; }
}
