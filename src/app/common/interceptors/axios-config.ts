import axios from 'axios';
import { environment } from '../../../environments/environment';

const backendUrl = environment.apiUrl;
const excludedPaths = [
  '/api/auth/login', 
  '/api/auth/register'
]; // Lista de rutas excluidas

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const isBackendRequest = config.url?.startsWith(backendUrl);
    const isExcluded = excludedPaths.some(path => config.url?.includes(path));

    if (token && isBackendRequest && !isExcluded) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;