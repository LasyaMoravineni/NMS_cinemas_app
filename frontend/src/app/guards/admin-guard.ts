import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth';

export const adminGuard: CanActivateFn = (route, state) => {

  const adminAuth = inject(AdminAuthService);
  const router = inject(Router);

  if (adminAuth.isLoggedIn()) {
    return true;
  }

  // If not logged in → go to admin login page
  return router.createUrlTree(['/admin/login']);
};
