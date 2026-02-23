import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie';
import { ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../../../services/loader';


@Component({
  selector: 'app-admin-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-movies.html'
})
export class AdminMovies implements OnInit {

  movies: any[] = [];

  movie: any = this.getEmptyMovie();

  editing = false;

  constructor(
    private movieService: MovieService,
    private cd: ChangeDetectorRef,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  /* =============================
     LOAD MOVIES
  ============================== */

  loadMovies(): void {
    this.loader.show();

    this.movieService.getAllMovies().subscribe({
      next: (data: any[]) => {
        this.movies = [...data];
        this.loader.hide();
      }
    
    });

    
  }
  trackByMovie(index: number, movie: any) {
  return movie.movieId;
}


  /* =============================
     SAVE (ADD / UPDATE)
  ============================== */

  saveMovie(): void {

    // 🔒 Validation
    if (
      !this.movie.posterUrl?.trim() ||
      !this.movie.title?.trim() ||
      !this.movie.genre?.trim() ||
      !this.movie.language?.trim() ||
      !this.movie.duration ||
      this.movie.duration <= 0
    ) {
      return;
    }

    this.loader.show();

    // UPDATE
    if (this.editing) {
      this.movieService.updateMovie(this.movie.movieId, this.movie)
        .subscribe(() => {
          this.loadMovies();
          this.resetForm();
          this.loader.hide();   
        });

    }
    //ADD
    else {
      this.movieService.addMovie(this.movie)
        .subscribe(() => {
          this.loadMovies();
          this.resetForm();
          this.loader.hide();
        });
    }
  }

  /* =============================
     EDIT
  ============================== */

  editMovie(m: any): void {
    this.movie = { ...m };   // preserve movieId
    this.editing = true;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  /* =============================
     DELETE
  ============================== */

  deleteMovie(id: number): void {

    if (!confirm('Delete this movie?')) return;

    this.loader.show();

    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.movies = this.movies.filter(m => m.movieId !== id);
        this.movies=[...this.movies];
        this.loader.hide();
      }
    });
  }

  /* =============================
     RESET
  ============================== */

  resetForm(): void {
    this.movie = this.getEmptyMovie();
    this.editing = false;
  }

  getEmptyMovie() {
    return {
      posterUrl: '',
      title: '',
      genre: '',
      language: '',
      duration: null,
      isUpcoming: false
    };
  }

}
