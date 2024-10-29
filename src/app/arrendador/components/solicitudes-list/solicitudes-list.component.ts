import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SolicitudesListComponent implements OnInit {
  solicitudes: SolicitudDTO[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const propiedadId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerSolicitudesPorPropiedad(propiedadId);
  }

  obtenerSolicitudesPorPropiedad(propiedadId: number): void {
    this.solicitudService.getSolicitudesPorPropiedad(propiedadId).then(solicitudes => {
      this.solicitudes = solicitudes;
    });
  }

  getEstadoSolicitudClase(solicitud: SolicitudDTO): string {
    const estado = solicitud.estadoSolicitud.nombreEstadoSolicitud;
    return estado === 'Pendiente' ? 'estado-pendiente' : 'estado-aceptada';
  }
}
