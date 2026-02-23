import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {

  private API = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }

  setAdmin(admin: any) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem('admin') || 'null');
  }

  isLoggedIn() {
    return !!localStorage.getItem('admin');
  }

  logout() {
    localStorage.removeItem('admin');
  }
}
