package com.nms.moviebooking.dto;

public class TheatreOccupancyDTO {

    private String theatreName;
    private String location;
    private double occupancyRate;

    public TheatreOccupancyDTO(String theatreName, String location, double occupancyRate) {
        this.theatreName = theatreName;
        this.location = location;
        this.occupancyRate = occupancyRate;
    }

    // getters & setters

    public String getTheatreName() { return theatreName; }
    public void setTheatreName(String theatreName) { this.theatreName = theatreName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public double getOccupancyRate() { return occupancyRate; }
    public void setOccupancyRate(double occupancyRate) { this.occupancyRate = occupancyRate; }
    
}
