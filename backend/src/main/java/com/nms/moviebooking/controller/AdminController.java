package com.nms.moviebooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nms.moviebooking.dto.AdminLoginRequestDTO;
import com.nms.moviebooking.dto.AdminLoginResponseDTO;
import com.nms.moviebooking.service.AdminService;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public AdminLoginResponseDTO login(@RequestBody AdminLoginRequestDTO request) {
        return adminService.login(request);
    }
}
