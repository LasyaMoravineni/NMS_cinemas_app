import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminMovies } from '../admin-movies/admin-movies';
import { AdminTheatres } from '../admin-theatres/admin-theatres';
import { AdminShows } from '../admin-shows/admin-shows';
import { AdminAnalytics } from '../admin-analytics/admin-analytics';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, AdminMovies, AdminTheatres, AdminShows, AdminAnalytics ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  section: string = 'movies';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/admin-login']);
  }
}
