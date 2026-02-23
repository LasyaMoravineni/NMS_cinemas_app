import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  private API = environment.apiUrl + '/theatres';

  constructor(private http: HttpClient) {}

  getAllTheatres(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  addTheatre(theatre: any): Observable<any> {
    return this.http.post(this.API, theatre);
  }

  updateTheatre(id: number, theatre: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, theatre);
  }

  deleteTheatre(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
