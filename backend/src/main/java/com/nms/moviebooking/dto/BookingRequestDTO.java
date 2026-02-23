package com.nms.moviebooking.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingRequestDTO {
    private Long userId;
    private Long showId;
    private int seatsBooked;
    private List<String> seatNumbers;
}
