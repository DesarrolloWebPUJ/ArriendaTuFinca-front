import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) { }

  navigateToProfile(event: Event){
    event.preventDefault();
    const idUsuario = this.route.snapshot.params['idUsuario'];
    this.router.navigate(['arrendador/perfil', idUsuario]);
  }

}
