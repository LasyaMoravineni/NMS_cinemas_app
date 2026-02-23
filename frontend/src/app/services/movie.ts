import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API = environment.apiUrl + '/movies';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  getByGenre(genre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/genre/${genre}`);
  }


  getUpcoming(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/upcoming`);
  }

  getShowsByMovie(movieId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/shows/movie/${movieId}`);
  }

  getShowById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/shows/${id}`);
  }

  confirmBooking(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bookings`, data);
  }

  searchByTitle(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/search/${title}`);
  }

  getByLanguage(language: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/language/${language}`);
  }

  search(title: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/search/${title}`);
  }

  addMovie(movie: any) {
  return this.http.post(this.API, movie);
}

updateMovie(id: number, movie: any) {
  return this.http.put(`${this.API}/${id}`, movie);
}

deleteMovie(id: number) {
  return this.http.delete(`${this.API}/${id}`);
}



}
