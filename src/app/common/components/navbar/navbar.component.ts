import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { UserRole } from '../../models/enums/UserRole';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userType: string = '';
  isArrendador = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (authService.isArrendador()){
      this.userType = UserRole.Arrendador.toLocaleLowerCase()
      this.isArrendador = true;
    }else{
      this.userType = UserRole.Arrendatario.toLocaleLowerCase()
    }
  }

  logOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['']);
  }

  navigateToHome(event: Event) {
    event.preventDefault();
    this.router.navigate([this.userType]);
  }

  navigateToProperties(event: Event) {
    event.preventDefault();
    this.router.navigate([`${this.userType}/propiedades`]);
  }

  navigateToSolicitudes(event: Event) {
    event.preventDefault();
    this.router.navigate([`${this.userType}/solicitudes`]);
  }

  navigateToProfile(event: Event) {
    event.preventDefault();
    this.router.navigate([`${this.userType}/perfil`]);
  }
}