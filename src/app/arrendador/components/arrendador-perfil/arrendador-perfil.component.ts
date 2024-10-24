import { Component } from '@angular/core';
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";
import { PerfilCardComponent } from "../../../common/components/perfil-card/perfil-card.component";

@Component({
  selector: 'app-arrendador-perfil',
  standalone: true,
  imports: [ArrendadorNavbarComponent, PerfilCardComponent],
  templateUrl: './arrendador-perfil.component.html',
  styleUrl: './arrendador-perfil.component.css'
})
export class ArrendadorPerfilComponent {

  arrendador: ArrendadorDTO;

  constructor(
    private arrendadorService: ArrendadorService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.arrendador = new ArrendadorDTO();
  }

  ngOnInit(): void {
    const idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.arrendadorService.getArrendador(idArrendador).then(arrendador => {
        this.arrendador = arrendador;
      }).catch((error) => {
        console.error(error);
      });
    }
  }

}
