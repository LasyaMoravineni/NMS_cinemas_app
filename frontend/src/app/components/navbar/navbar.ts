import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  searchText = '';
  isLoggedIn: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  search() {
    if (!this.searchText.trim()) return;

    this.router.navigate(['/'], {
      queryParams: { search: this.searchText.trim() }
    });

    this.searchText = '';
  }
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  goToLogin() {
  this.router.navigate(['/login']);
}

goToRegister() {
  this.router.navigate(['/register']);
}


  logout() {
      this.auth.logout();
      this.isLoggedIn = false;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToBookings() {
  this.router.navigate(['/my-bookings']);
}


}




