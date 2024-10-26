import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-arrendatario-navbar',
  standalone: true,
  imports: [],
  templateUrl: './arrendatario-navbar.component.html',
  styleUrl: './arrendatario-navbar.component.css'
})
export class ArrendatarioNavbarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  logOut(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  
  }

  navigateToProperties(event: Event) {
    event.preventDefault();
    this.router.navigate(['arrendatario/propiedades']);
  
  }
  
  navigateToProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['arrendatario/perfil']);
  
  }
  
  navigateToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['arrendatario']);
  
  }

}
