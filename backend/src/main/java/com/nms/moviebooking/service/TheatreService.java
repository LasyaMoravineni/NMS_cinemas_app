package com.nms.moviebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nms.moviebooking.model.Theatre;
import com.nms.moviebooking.repository.TheatreRepository;


@Service
public class TheatreService {

    @Autowired
    private TheatreRepository theatreRepository;

    public Theatre addTheatre(Theatre theatre) {
        return theatreRepository.save(theatre);
    }

    public List<Theatre> getAllTheatres() {
        return theatreRepository.findAll();
    }

    public Theatre updateTheatre(Long id, Theatre updatedTheatre) {
        Theatre existing = theatreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Theatre not found with id " + id));

        existing.setName(updatedTheatre.getName());
        existing.setLocation(updatedTheatre.getLocation());

        return theatreRepository.save(existing);
    }

    public void deleteTheatre(Long id) {
        if (!theatreRepository.existsById(id)) {
            throw new RuntimeException("Theatre not found with id " + id);
        }
        theatreRepository.deleteById(id);
    }
}
