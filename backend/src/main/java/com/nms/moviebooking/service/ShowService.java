package com.nms.moviebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nms.moviebooking.dto.ShowRequestDTO;
import com.nms.moviebooking.dto.ShowResponseDTO;
import com.nms.moviebooking.model.Show;
import com.nms.moviebooking.repository.MovieRepository;
import com.nms.moviebooking.repository.ShowRepository;
import com.nms.moviebooking.repository.TheatreRepository;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TheatreRepository theatreRepository;

    public ShowResponseDTO addShow(ShowRequestDTO dto) {
        Show show = buildShowFromDTO(dto);
        Show saved = showRepository.save(show);
        return buildResponse(saved);
    }

    public ShowResponseDTO updateShow(Long id, ShowRequestDTO dto) {
        Show existing = showRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found"));

        existing.setMovie(
                movieRepository.findById(dto.getMovieId())
                        .orElseThrow(() -> new RuntimeException("Movie not found"))
        );
        existing.setTheatre(
                theatreRepository.findById(dto.getTheatreId())
                        .orElseThrow(() -> new RuntimeException("Theatre not found"))
        );
        existing.setShowTime(dto.getShowTime());
        existing.setPrice(dto.getPrice());
        existing.setAvailableSeats(dto.getAvailableSeats());

        return buildResponse(showRepository.save(existing));
    }

    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found"));
    }

    public List<Show> getShowsByMovie(Long movieId) {
        return showRepository.findByMovieMovieId(movieId);
    }

    public List<Show> getShowsByTheatre(Long theatreId) {
        return showRepository.findByTheatreTheatreId(theatreId);
    }

    /* ---------- helpers ---------- */

    private Show buildShowFromDTO(ShowRequestDTO dto) {
        Show show = new Show();
        show.setMovie(movieRepository.findById(dto.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found")));
        show.setTheatre(theatreRepository.findById(dto.getTheatreId())
                .orElseThrow(() -> new RuntimeException("Theatre not found")));
        show.setShowTime(dto.getShowTime());
        show.setPrice(dto.getPrice());
        show.setAvailableSeats(dto.getAvailableSeats());
        return show;
    }

    private ShowResponseDTO buildResponse(Show s) {
        ShowResponseDTO dto = new ShowResponseDTO();
        dto.setShowId(s.getShowId());
        dto.setMovieTitle(s.getMovie().getTitle());
        dto.setTheatreName(s.getTheatre().getName());
        dto.setShowTime(s.getShowTime());
        dto.setPrice(s.getPrice());
        dto.setAvailableSeats(s.getAvailableSeats());
        return dto;
    }
}
