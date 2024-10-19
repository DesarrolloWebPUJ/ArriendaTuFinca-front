import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const simpleAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    if (typeof window !== 'undefined') {
      alert('Fallo de autenticacion');
    }
    router.navigate(['/login']);
    return false;
  }
};
