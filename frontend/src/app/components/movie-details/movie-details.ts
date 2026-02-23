import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css']
})
export class MovieDetails implements OnInit {

  movie: any;
  shows: any[] = [];
  groupedShows: any ={};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loader.show();

    this.movieService.getMovieById(id).subscribe(data => {
      this.movie = data;
    });
    

    this.movieService.getShowsByMovie(id).subscribe((data: any[]) => {

      this.shows=data;

      // Group shows by theatre
      this.groupedShows = data.reduce((acc: any, show: any) => {

        const theatreName = show.theatre?.name;

        if (!acc[theatreName]) {
          acc[theatreName] = [];
        }

        acc[theatreName].push(show);

        return acc;

      }, {});

      this.loader.hide();
    });
  }

  book(showId: number) {
    this.router.navigate(['/booking', showId]);
  }
}

