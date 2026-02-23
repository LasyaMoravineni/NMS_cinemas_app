package com.nms.moviebooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nms.moviebooking.dto.AdminAnalyticsDTO;
import com.nms.moviebooking.service.AdminAnalyticsService;

@RestController
@RequestMapping("/api/admin/analytics")
@CrossOrigin(origins = "*")
public class AdminAnalyticsController {

    @Autowired
    private AdminAnalyticsService service;

    @GetMapping
    public AdminAnalyticsDTO getAnalytics() {
        return service.getAnalytics();
    }
}
