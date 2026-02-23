import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminAnalyticsService {

  private API = environment.apiUrl + '/admin/analytics';

  constructor(private http: HttpClient) {}

  getAnalytics() {
    return this.http.get<any>(this.API);
  }
  
}
