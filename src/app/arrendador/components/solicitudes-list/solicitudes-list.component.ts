import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { PropiedadService } from '../../../common/services/propiedad.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { CuentaDTO } from '../../../common/models/CuentaDTO';
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";

@Component({
  selector: 'app-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ArrendadorNavbarComponent]
})
export class SolicitudesListComponent implements OnInit {
  solicitudes: SolicitudDTO[] = [];
  arrendador: CuentaDTO | null = null;
  esArrendador: boolean = false;

  constructor(
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Comprobar si el usuario es arrendador.
    this.arrendador = this.authService.getCurrentUser();
    if (this.arrendador && this.arrendador.idCuenta != null) {
      this.esArrendador = true;
      this.obtenerSolicitudesPorArrendador(this.arrendador.idCuenta);
    }
  }

  async obtenerSolicitudesPorArrendador(arrendadorId: number): Promise<void> {
    try {
      // Obtener todas las propiedades del arrendador.
      const propiedades: PropiedadDTO[] = await this.propiedadService.getPropiedadesByArrendador(arrendadorId);
      let todasLasSolicitudes: SolicitudDTO[] = [];

      // Obtener todas las solicitudes de cada propiedad del arrendador.
      for (let propiedad of propiedades) {
        const solicitudesPropiedad = await this.solicitudService.getSolicitudesPorPropiedad(propiedad.idPropiedad);
        todasLasSolicitudes = todasLasSolicitudes.concat(solicitudesPropiedad);
      }

      this.solicitudes = todasLasSolicitudes;
    } catch (error) {
      console.error('Error al obtener las solicitudes del arrendador:', error);
    }
  }

  getEstadoSolicitudClase(solicitud: SolicitudDTO): string {
    const estado = solicitud.estadoSolicitud.nombreEstadoSolicitud;
    return estado === 'Pendiente' ? 'estado-pendiente' : 'estado-aceptada';
  }
}
