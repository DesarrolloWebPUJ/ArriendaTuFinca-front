import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const backendUrl = environment.apiUrl;
  const excludedPaths = [
    '/api/auth/login', 
    '/api/auth/register'
  ]; // Lista de rutas excluidas

  const isBackendRequest = req.url.startsWith(backendUrl);
  const isExcluded = excludedPaths.some(path => req.url.includes(path));

  if (token && isBackendRequest && !isExcluded) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};