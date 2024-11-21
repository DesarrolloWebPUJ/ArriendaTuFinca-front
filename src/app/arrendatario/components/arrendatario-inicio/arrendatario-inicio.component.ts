import { Component } from '@angular/core';
import { ArrendatarioNavbarComponent } from "../arrendatario-navbar/arrendatario-navbar.component";
import { CommonModule } from '@angular/common';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { ArrendatarioService } from '../../../common/services/arrendatario.service';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { AuthService } from '../../../common/services/auth.service';
import { SolicitudCardComponent } from '../../../common/components/solicitud-card/solicitud-card.component';
import { CuentaDTO } from '../../../common/models/CuentaDTO';

@Component({
  selector: 'app-arrendatario-inicio',
  standalone: true,
  imports: [ArrendatarioNavbarComponent, CommonModule, SolicitudCardComponent],
  templateUrl: './arrendatario-inicio.component.html',
  styleUrl: './arrendatario-inicio.component.css'
})
export class ArrendatarioInicioComponent {

  private readonly maxSolicitudes = 5;

  arrendatario: CuentaDTO | null = null;
  solicitudes: SolicitudDTO[] = [];
  solicitudesCargadas = false;
  isArrendador: boolean = false;

  constructor(
    private arrendadorService: ArrendatarioService,
    private solicitudService: SolicitudService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let idArrendatario= this.authService.getCurrentUser()?.idCuenta;
    if (idArrendatario) {
      this.arrendatario = this.authService.getCurrentUser();
      this.loadSolicitudesData(idArrendatario);
    }
  }

  private async loadSolicitudesData(idArrendatario: number): Promise<void> {
    try {
      let solicitudesArrendatario = await this.solicitudService.getSolicitudesByArrendatario(idArrendatario);
      this.solicitudes = this.getSolicitudesMasRecientes(solicitudesArrendatario);
      this.solicitudesCargadas = true;
    } catch (error) {
      console.error('Error fetching solicitudes data:', error);
    }
  }

  private getSolicitudesMasRecientes(solicitudes: SolicitudDTO[]){
    if (solicitudes.length > this.maxSolicitudes) {
      return solicitudes.slice(solicitudes.length - this.maxSolicitudes);
    }
    return solicitudes.reverse();
  }

  actualizarSolicitudes() {
    let idArrendatario = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendatario) {
      this.loadSolicitudesData(idArrendatario);
    }
  }
}
