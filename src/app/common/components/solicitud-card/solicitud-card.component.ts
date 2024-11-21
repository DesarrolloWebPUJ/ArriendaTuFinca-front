import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FechaYHoraPipe } from "../../pipes/fecha-yhora.pipe";
import { SolicitudDTO } from '../../models/solicitud/SolicitudDTO';
import { CostoDineroPipe } from "../../pipes/costo-dinero.pipe";
import { AuthService } from '../../services/auth.service';
import { SolicitudStatus } from '../../models/enums/SolicitudStatus';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudBotonesComponent } from "../solicitud-botones/solicitud-botones.component";

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FechaYHoraPipe, CostoDineroPipe, SolicitudBotonesComponent],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
  @Input() solicitudes: SolicitudDTO[] = [];

  @Output() solicitudActualizada = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private solicitudService: SolicitudService
  ) {}

  mostrarBotonAceptar(solicitud: SolicitudDTO): boolean {
    return this.authService.isArrendador() && solicitud.estadoSolicitud.nombreEstadoSolicitud === SolicitudStatus.Pendiente;
  }

  mostrarBotonRechazar(solicitud: SolicitudDTO): boolean {
    return this.authService.isArrendador() && solicitud.estadoSolicitud.nombreEstadoSolicitud === SolicitudStatus.Pendiente;
  }

  mostrarBotonCalificar(solicitud: SolicitudDTO): boolean {
    return solicitud.estadoSolicitud.nombreEstadoSolicitud === SolicitudStatus.PorCalificar;
  }

  mostrarBotonPagar(solicitud: SolicitudDTO): boolean {
    return !this.authService.isArrendador() && solicitud.estadoSolicitud.nombreEstadoSolicitud === SolicitudStatus.PorPagar;
  }

  async aceptarSolicitud(solicitud: SolicitudDTO) {
    await this.solicitudService.aprobarSolicitud(solicitud.idSolicitud);
    this.recargarComponente();
  }

  async rechazarSolicitud(solicitud: SolicitudDTO) {
    await this.solicitudService.rechazarSolicitud(solicitud.idSolicitud);
    this.recargarComponente();
  }

  async pagarSolicitud(solicitud: SolicitudDTO) {
    await this.solicitudService.pagarSolicitud(solicitud.idSolicitud);
    this.recargarComponente();
  }

  recargarComponente() {
    this.solicitudActualizada.emit();
  }

  async calificarSolicitud(solicitud: SolicitudDTO) {
    // Ir a calificar solicitud
  }

  esArrendador(){
    return this.authService.isArrendador();
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
