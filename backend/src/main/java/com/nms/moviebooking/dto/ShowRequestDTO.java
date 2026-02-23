package com.nms.moviebooking.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ShowRequestDTO {

    private Long movieId;
    private Long theatreId;
    private LocalDateTime showTime;
    private double price;
    private int availableSeats;
}
