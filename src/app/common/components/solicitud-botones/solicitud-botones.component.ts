import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolicitudDTO } from '../../models/solicitud/SolicitudDTO';
import { AuthService } from '../../services/auth.service';
import { SolicitudStatus } from '../../models/enums/SolicitudStatus';
import { SolicitudService } from '../../services/solicitud.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitud-botones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-botones.component.html',
  styleUrl: './solicitud-botones.component.css'
})
export class SolicitudBotonesComponent {

  @Input() solicitud: SolicitudDTO = new SolicitudDTO();
  @Output() solicitudActualizada = new EventEmitter<void>();


  constructor(
    private authService: AuthService,
    private solicitudService: SolicitudService
  ) {
  }

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

  calificarSolicitud(solicitud: SolicitudDTO){
    // TODO: Implementar calificar solicitud
  }

  async aceptarSolicitud(solicitud: SolicitudDTO) {
    await this.solicitudService.aprobarSolicitud(solicitud.idSolicitud);
    this.solicitudActualizada.emit();
  }

  async rechazarSolicitud(solicitud: SolicitudDTO) {
    await this.solicitudService.rechazarSolicitud(solicitud.idSolicitud);
    this.solicitudActualizada.emit();
  }

  async pagarSolicitud(solicitud: SolicitudDTO) {
    await this.solicitudService.pagarSolicitud(solicitud.idSolicitud);
    this.solicitudActualizada.emit();
  }
}


