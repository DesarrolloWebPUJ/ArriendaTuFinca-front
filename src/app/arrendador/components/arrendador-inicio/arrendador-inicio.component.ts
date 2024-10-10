import { Component } from '@angular/core';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrendador-inicio',
  standalone: true,
  imports: [ArrendadorNavbarComponent, CommonModule, RouterModule],
  templateUrl: './arrendador-inicio.component.html',
  styleUrl: './arrendador-inicio.component.css'
})
export class ArrendadorInicioComponent {

  arrendador: ArrendadorDTO = new ArrendadorDTO();
  // solicitudes: SolicitudDTO[] = [];

  constructor(
    private arrendadorService: ArrendadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idArrendador = params['idUsuario'];
      this.arrendadorService.getArrendador(idArrendador).then(arrendador => {
        this.arrendador = arrendador;
      }).catch((error) => {
        console.error(error);
      });
    });
    this.getArrendadorData();
    // this.getSolicitudesData();
  }

  getArrendadorData(): void {
    
  }

}
