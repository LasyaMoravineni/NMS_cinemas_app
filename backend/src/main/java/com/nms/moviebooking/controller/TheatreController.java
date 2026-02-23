package com.nms.moviebooking.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nms.moviebooking.model.Theatre;
import com.nms.moviebooking.service.TheatreService;

@RestController
@RequestMapping("/api/theatres")
@CrossOrigin(origins = "*")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addTheatre(@RequestBody Theatre theatre) {

        Theatre saved = theatreService.addTheatre(theatre);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Theatre added successfully");
        response.put("theatre", saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public List<Theatre> getAllTheatres() {
        return theatreService.getAllTheatres();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTheatre(
            @PathVariable Long id,
            @RequestBody Theatre theatre) {

        Theatre updated = theatreService.updateTheatre(id, theatre);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTheatre(@PathVariable Long id) {
        theatreService.deleteTheatre(id);
        return ResponseEntity.ok(
                Map.of("message", "Theatre deleted successfully")
        );
    }
}
