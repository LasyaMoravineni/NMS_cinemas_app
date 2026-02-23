import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth';


@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-navbar.html'
})
export class AdminNavbar {

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private router: Router,
    private adminAuth: AdminAuthService
  ) {}

  onToggle() {
    this.toggleSidebar.emit();
  }


  go(section: string) {
    this.router.navigate(['/admin'], { queryParams: { section } });
  }

  logout() {
    this.adminAuth.logout();
    this.router.navigate(['/admin/login']);
  }

  get adminName() {
    return this.adminAuth.getAdmin()?.username;
  }
}
