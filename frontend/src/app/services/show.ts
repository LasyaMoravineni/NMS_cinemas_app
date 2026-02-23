import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private API = environment.apiUrl + '/shows';

  constructor(private http: HttpClient) {}

  getShowById(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  getShowsByMovie(movieId: number): Observable<any> {
    return this.http.get(`${this.API}/movie/${movieId}`);
  }

  getAllShows(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  getBookedSeats(showId: number) {
    return this.http.get<string[]>(
      `${environment.apiUrl}/bookings/show/${showId}/seats`
    );
  }


  addShow(show: any): Observable<any> {
    return this.http.post(this.API, show);
  }

  updateShow(id: number, show: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, show);
  }

  deleteShow(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

}
