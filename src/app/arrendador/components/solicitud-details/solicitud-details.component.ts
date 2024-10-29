import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { FechaYHoraPipe } from '../../../common/pipes/fecha-yhora.pipe';
import { CostoDineroPipe } from '../../../common/pipes/costo-dinero.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-details',
  templateUrl: './solicitud-details.component.html',
  styleUrls: ['./solicitud-details.component.css'],
  standalone: true,
  imports: [FechaYHoraPipe, CostoDineroPipe, CommonModule]
})

export class SolicitudDetailsComponent implements OnInit {
  solicitud: Partial<SolicitudDTO> = {};

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

  aceptarSolicitud(): void {
    if (this.solicitud?.idSolicitud) {
      this.solicitudService.actualizarEstadoSolicitud(this.solicitud.idSolicitud, 'Aceptada').then(() => {
        alert('Solicitud aceptada');
      });
    } else {
      console.error("La solicitud no está definida o no tiene un ID.");
    }
  }

  rechazarSolicitud(): void {
    if (this.solicitud?.idSolicitud) {
      this.solicitudService.actualizarEstadoSolicitud(this.solicitud.idSolicitud, 'Rechazada').then(() => {
        alert('Solicitud rechazada');
      });
    } else {
      console.error("La solicitud no está definida o no tiene un ID.");
    }
  }

  getEstadoSolicitudClase(solicitud: SolicitudDTO | Partial<SolicitudDTO>): string {
    if (!solicitud?.estadoSolicitud?.nombreEstadoSolicitud) {
      return '';
    }
    const estado = solicitud.estadoSolicitud.nombreEstadoSolicitud;
    return estado === 'Pendiente' ? 'estado-pendiente' : 'estado-aceptada';
  }
}
