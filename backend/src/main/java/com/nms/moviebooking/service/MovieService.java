package com.nms.moviebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nms.moviebooking.exception.ResourceNotFoundException;
import com.nms.moviebooking.model.Movie;
import com.nms.moviebooking.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> searchByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenre(genre);
    }

    public List<Movie> getMoviesByLanguage(String language) {
        return movieRepository.findByLanguage(language);
    }

    public List<Movie> getUpcomingMovies() {
        return movieRepository.findByIsUpcoming(true);
    }
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id " + id));
    }
    public Movie updateMovie(Long id, Movie updatedMovie) {
        Movie existing = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        existing.setTitle(updatedMovie.getTitle());
        existing.setGenre(updatedMovie.getGenre());
        existing.setLanguage(updatedMovie.getLanguage());
        existing.setDuration(updatedMovie.getDuration());
        existing.setIsUpcoming(updatedMovie.getIsUpcoming());
        existing.setPosterUrl(updatedMovie.getPosterUrl());


        return movieRepository.save(existing);
    }

    public void deleteMovie(Long id) {
        if (!movieRepository.existsById(id)) {
            throw new RuntimeException("Movie not found with id: " + id);
        }
        
        movieRepository.deleteById(id);
    }


}
