import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { AdminNavbar } from './components/admin/admin-navbar/admin-navbar';
import { Spinner } from './components/shared/spinner/spinner';
import { LoaderService } from './services/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, AdminNavbar, Spinner],
  templateUrl: './app.html'
})
export class App {

  constructor(
    public router: Router,
    public loader: LoaderService
  
  ) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  isAdminLogin(): boolean {
    return this.router.url === '/admin/login';
  }
}
