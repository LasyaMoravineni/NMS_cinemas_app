import { Routes } from '@angular/router';

import { Movies } from './components/movies/movies';
import { MovieDetails } from './components/movie-details/movie-details';
import { Booking } from './components/booking/booking';
import { Success } from './components/success/success';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { adminGuard } from './guards/admin-guard';
import { AdminLogin } from './components/admin/admin-login/admin-login';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Movies },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'movie/:id', component: MovieDetails },
  { path: 'booking/:id', component: Booking },
  { path: 'success', component: Success },
  
  // ADMIN ROUTES
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin', component: AdminDashboard, canActivate: [adminGuard] },
  {
  path: 'my-bookings',
  loadComponent: () =>
    import('./components/booking-history/booking-history')
      .then(m => m.BookingHistory)
}

];
