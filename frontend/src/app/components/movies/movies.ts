import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class Movies implements OnInit {

  allMovies: any[] = [];
  movies: any[] = [];

  searchText = '';
  selectedGenre = '';
  selectedLanguage = '';
  showUpcoming = false;

  constructor(
    private movieService: MovieService,
    private loader: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}


  ngOnInit() {

    this.loader.show();

    this.movieService.getAllMovies().subscribe((data: any[]) => {
      this.allMovies = data;

      // Listen to query params
      this.route.queryParams.subscribe(params => {
        this.searchText = params['search'] || '';
        this.applyFilters();
      });

      this.loader.hide();
    });
  }

  applyFilters() {

    this.movies = this.allMovies.filter(movie => {

      const matchesGenre =
        !this.selectedGenre || movie.genre === this.selectedGenre;

      const matchesLanguage =
        !this.selectedLanguage || movie.language === this.selectedLanguage;

      const matchesUpcoming =
        !this.showUpcoming || movie.isUpcoming === true;

      const matchesSearch =
        !this.searchText ||
        movie.title.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesGenre && matchesLanguage && matchesUpcoming && matchesSearch;
    });
  }

  toggleUpcoming() {
    this.showUpcoming = !this.showUpcoming;
    this.applyFilters();
  }

  resetFilters() {
    this.searchText = '';
    this.selectedGenre = '';
    this.selectedLanguage = '';
    this.showUpcoming = false;
    this.applyFilters();
  }

  viewMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
