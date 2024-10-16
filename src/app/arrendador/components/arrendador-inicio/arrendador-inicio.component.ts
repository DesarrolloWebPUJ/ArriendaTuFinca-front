import { Component } from '@angular/core';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { FechaYHoraPipe } from "../../../common/pipes/fecha-yhora.pipe";

@Component({
  selector: 'app-arrendador-inicio',
  standalone: true,
  imports: [ArrendadorNavbarComponent, CommonModule, RouterModule, FechaYHoraPipe],
  templateUrl: './arrendador-inicio.component.html',
  styleUrl: './arrendador-inicio.component.css'
})
export class ArrendadorInicioComponent {

  private readonly maxSolicitudes : number = 5;

  arrendador: ArrendadorDTO = new ArrendadorDTO();
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
  solicitudes: SolicitudDTO[] = [];
  solicitudesCargadas = false;

  solicitud = {
    propiedad: {
      nombrePropiedad: ''
    }
  };

  constructor(
    private arrendadorService: ArrendadorService,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params => {
        const idArrendador = params['idUsuario'];
        this.loadArrendadorData(idArrendador);
        this.loadSolicitudesData(idArrendador);
      },
      error: error => {
        console.error('Error fetching route params:', error);
      }
    });
  }

  private async loadArrendadorData(idArrendador: number): Promise<void> {
    try {
      this.arrendador = await this.arrendadorService.getArrendador(idArrendador);
    } catch (error) {
      console.error('Error fetching arrendador data:', error);
    }
  }

  private async loadSolicitudesData(idArrendador: number): Promise<void> {
    try {
      this.solicitudes = await this.solicitudService.getTopRecentSolicitudesByArrendador(idArrendador, this.maxSolicitudes);
      this.solicitudesCargadas = true;
    } catch (error) {
      console.error('Error fetching solicitudes data:', error);
    }
  }

  getEstadoSolicitudClase(solicitud: SolicitudDTO): string {
    const estado = solicitud.estadoSolicitud.nombreEstadoSolicitud;

    switch (estado) {
        case 'Pendiente':
            return 'estado-pendiente';
        case 'aceptada':
            return 'estado-aceptada';
        default:
            return '';
    }
}

}
