import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html'
})
export class AdminLogin {

  username = '';
  password = '';
  error = '';

  constructor(
    private adminAuth: AdminAuthService,
    private router: Router
  ) {}

  login() {

    if (!this.username || !this.password) {
      this.error = "Please enter username and password";
      return;
    }

    this.adminAuth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('admin', JSON.stringify(res));
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = "Invalid admin credentials";
      }
    });
  }
}
