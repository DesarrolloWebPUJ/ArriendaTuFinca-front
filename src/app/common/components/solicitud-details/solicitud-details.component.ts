import { Component } from '@angular/core';
import { SolicitudDTO } from '../../models/solicitud/SolicitudDTO';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudBotonesComponent } from "../solicitud-botones/solicitud-botones.component";
import { CostoDineroPipe } from "../../pipes/costo-dinero.pipe";
import { FechaYHoraPipe } from "../../pipes/fecha-yhora.pipe";
import { SolicitudStatus } from '../../models/enums/SolicitudStatus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-details',
  standalone: true,
  imports: [SolicitudBotonesComponent, CostoDineroPipe, FechaYHoraPipe, CommonModule],
  templateUrl: './solicitud-details.component.html',
  styleUrl: './solicitud-details.component.css'
})
export class SolicitudDetailsComponent {
  solicitud: SolicitudDTO = new SolicitudDTO();

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const solicitudId = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitudService.getSolicitudById(solicitudId).then(data => {
      this.solicitud = data;
    });
  }

  recargarComponente(){
    this.ngOnInit();
  }

  getEstadoSolicitudClase(solicitud: SolicitudDTO): string {
    const estado = solicitud.estadoSolicitud.nombreEstadoSolicitud;

    switch (estado) {
      case SolicitudStatus.Pendiente:
        return 'estado-pendiente';
      case SolicitudStatus.PorPagar:
        return 'estado-aceptada';
      case SolicitudStatus.Rechazada:
        return 'estado-rechazada';
      case SolicitudStatus.PorCalificar:
        return 'estado-calificacion';
      case SolicitudStatus.Cerrada:
        return 'estado-finalizada';
      default:
        return '';
    }
  }
}
