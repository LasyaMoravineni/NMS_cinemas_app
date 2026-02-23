package com.nms.moviebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nms.moviebooking.dto.AdminLoginRequestDTO;
import com.nms.moviebooking.dto.AdminLoginResponseDTO;
import com.nms.moviebooking.model.Admin;
import com.nms.moviebooking.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    

    public AdminLoginResponseDTO login(AdminLoginRequestDTO request) {

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        AdminLoginResponseDTO response = new AdminLoginResponseDTO();
        response.setAdminId(admin.getAdminId());
        response.setUsername(admin.getUsername());

        return response;
    }
}
