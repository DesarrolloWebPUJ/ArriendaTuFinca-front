import { Component } from '@angular/core';
import { ArrendatarioNavbarComponent } from "../arrendatario-navbar/arrendatario-navbar.component";
import { PerfilCardComponent } from "../../../common/components/perfil-card/perfil-card.component";
import { ArrendatarioDTO } from '../../../common/models/ArrendatarioDTO';
import { ArrendatarioService } from '../../../common/services/arrendatario.service';
import { AuthService } from '../../../common/services/auth.service';

@Component({
  selector: 'app-arrendatario-perfil',
  standalone: true,
  imports: [ArrendatarioNavbarComponent, PerfilCardComponent],
  templateUrl: './arrendatario-perfil.component.html',
  styleUrl: './arrendatario-perfil.component.css'
})
export class ArrendatarioPerfilComponent {

  arrendatario: ArrendatarioDTO;

  constructor(
    private arrendatarioService: ArrendatarioService,
    private authService: AuthService
  ) {
    this.arrendatario = new ArrendatarioDTO();
  }

  ngOnInit(): void {
    const idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.arrendatarioService.getArrendatario(idArrendador).then(arrendador => {
        this.arrendatario = arrendador;
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
