import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-arrendador-navbar',
  standalone: true,
  imports: [],
  templateUrl: './arrendador-navbar.component.html',
  styleUrl: './arrendador-navbar.component.css'
})
export class ArrendadorNavbarComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  navigateToProfile(event: Event){
    event.preventDefault();
    this.router.navigate(['arrendador/perfil']);
  }

  logOut(event : Event){
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['']);
  }

  navigateToHome(event: Event){
    event.preventDefault();
    this.router.navigate(['arrendador']);
  }

  navigateToProperties(event: Event){
    event.preventDefault();
    this.router.navigate(['arrendador/propiedades']);
  }

}
