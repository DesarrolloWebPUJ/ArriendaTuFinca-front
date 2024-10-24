import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FechaYHoraPipe } from "../../pipes/fecha-yhora.pipe";
import { SolicitudDTO } from '../../models/solicitud/SolicitudDTO';
import { CostoDineroPipe } from "../../pipes/costo-dinero.pipe";

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FechaYHoraPipe, CostoDineroPipe],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
  @Input() solicitudes: SolicitudDTO[] = [];


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
