import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowService } from '../../../services/show';
import { MovieService } from '../../../services/movie';
import { TheatreService } from '../../../services/theatre';
import { LoaderService } from '../../../services/loader';


@Component({
  selector: 'app-admin-shows',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-shows.html'
})
export class AdminShows implements OnInit {

  shows: any[] = [];
  movies: any[] = [];
  theatres: any[] = [];

  show: any = this.emptyShow();
  editing = false;

  constructor(
    private showService: ShowService,
    private movieService: MovieService,
    private theatreService: TheatreService,
    private cd: ChangeDetectorRef,
    private loader: LoaderService

  ) {}

  ngOnInit(): void {
    this.loadShows();
    this.loadMovies();
    this.loadTheatres();
  }

  emptyShow() {
    return {
      movieId: '',
      theatreId: '',
      showTime: '',
      price: '',
      availableSeats: ''
    };
  }

  loadShows(): void {
    this.loader.show();
    this.showService.getAllShows().subscribe((data: any[]) => {
      this.shows = [...data];
      this.loader.hide();
    });
  }

  loadMovies(): void {
    this.loader.show();
    this.movieService.getAllMovies().subscribe((data: any[]) => {
      this.movies = data;
      this.loader.hide();
    });
  }

  loadTheatres(): void {
    this.loader.show();
    this.theatreService.getAllTheatres().subscribe((data: any[]) => {
      this.theatres = data;
      this.loader.hide();
    });
  }

  trackByShow(index: number, s: any) {
    return s.showId;
  }

  
  saveShow(): void {

    if (!this.show.movieId ||
        !this.show.theatreId ||
        !this.show.showTime ||
        !this.show.price ||
        !this.show.availableSeats) {
      return;
    }

    this.loader.show();

    if (this.editing) {

      this.showService.updateShow(this.show.showId, this.show)
        .subscribe(() => {
          this.loadShows();      
          this.resetForm();
          this.loader.hide();
      });

    } else {

      this.showService.addShow(this.show)
        .subscribe(() => {
          this.loadShows();
          this.resetForm();
          this.loader.hide();
        });
    }
  }

  editShow(s: any): void {
    this.show = {
      showId: s.showId,
      movieId: s.movie.movieId,
      theatreId: s.theatre.theatreId,
      showTime: s.showTime,
      price: s.price,
      availableSeats: s.availableSeats
    };
    this.editing = true;
  }

  deleteShow(id: number): void {

    this.loader.show();

    this.showService.deleteShow(id)
      .subscribe(() => {

        this.shows = this.shows.filter(s => s.showId !== id);
        this.shows = [...this.shows];
        this.loader.hide();
      });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.show = this.emptyShow();
    this.editing = false;
  }
}
