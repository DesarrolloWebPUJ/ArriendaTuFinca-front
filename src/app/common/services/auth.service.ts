import { Injectable } from '@angular/core';
import { CuentaDTO } from '../models/CuentaDTO';
import { environment } from '../../../environments/environment';
import { ArrendadorService } from './arrendador.service';
import { Router } from '@angular/router';
import { UserRole } from '../models/enums/UserRole';
import { jwtDecode } from 'jwt-decode';
import axios from '../interceptors/axios-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';
  private userRoleKey = 'userRole';

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private arrendadorService: ArrendadorService, 
    private router : Router
  ) { }

  async login(email: string, contrasena: string) {
    const response = await axios.post<string>(environment.apiUrl + '/auth/login', { email, contrasena });
    this.setToken(response.data);
    //await this.findLoginUserRole(response.data);
  }

  private async setToken(token: string) {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(this.tokenKey, token);
      this.getUserDetails(token);
    }
  }

  private getUserDetails(token: string){
    let data: any = jwtDecode(token);
    let cuenta = new CuentaDTO();
    cuenta.idCuenta = data.id;
    cuenta.email = data.email;
    cuenta.nombreCuenta = data.nombre;
    let rol = data.rol;
    this.setCurrentUser(cuenta, rol);
  }

  private async findLoginUserRole(user: CuentaDTO){
    let arrendador = null;
    if (user.idCuenta !== undefined && user.idCuenta !== null) {
      try{
        await this.arrendadorService.getArrendador(user.idCuenta).then(data => {
          arrendador = data;
        });
      } catch (error) {}
    } else {
      console.error('Invalid user idCuenta');
    }
    const role = arrendador ? UserRole.Arrendador : UserRole.Arrendatario;
    this.setCurrentUser(user, role);
  }

  logout() {
    //this.removeToken();
    this.removeCurrentUser();
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: CuentaDTO, role: UserRole) {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      localStorage.setItem(this.userRoleKey, role);
    }
  }

  getCurrentUser(): CuentaDTO | null {
    if (this.isLocalStorageAvailable) {
      const user = localStorage.getItem(this.currentUserKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getUserRole(): UserRole | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(this.userRoleKey) as UserRole;
    }
    return null;
  }

  private removeCurrentUser() {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(this.currentUserKey);
      localStorage.removeItem(this.userRoleKey);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private removeToken() {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isArrendador(): boolean {
    return this.getUserRole() === UserRole.Arrendador;
  }

}
