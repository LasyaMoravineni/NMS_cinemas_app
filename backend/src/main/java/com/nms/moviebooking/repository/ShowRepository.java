package com.nms.moviebooking.repository;

import com.nms.moviebooking.model.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {

    List<Show> findByMovieMovieId(Long movieId);

    List<Show> findByTheatreTheatreId(Long theatreId);
}
