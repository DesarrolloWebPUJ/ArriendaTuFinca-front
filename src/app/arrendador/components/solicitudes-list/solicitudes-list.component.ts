import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";
import { SolicitudCardComponent } from "../../../common/components/solicitud-card/solicitud-card.component";
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { AuthService } from '../../../common/services/auth.service';
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';

@Component({
  selector: 'app-solicitudes-list',
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ArrendadorNavbarComponent, SolicitudCardComponent]
})
export class SolicitudesListComponent implements OnInit {
  arrendador: ArrendadorDTO = new ArrendadorDTO();
  solicitudes: SolicitudDTO[] = [];
  solicitudesCargadas = false;
  isArrendador: boolean = true;

  solicitud = {
    propiedad: {
      nombrePropiedad: ''
    }
  };

  constructor(
    private arrendadorService: ArrendadorService,
    private solicitudService: SolicitudService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.loadArrendadorData(idArrendador);
      this.loadSolicitudesData(idArrendador);
    }
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
      this.solicitudes = await this.solicitudService.getTopRecentSolicitudesByArrendador(idArrendador, -1);
      this.solicitudesCargadas = true;
    } catch (error) {
      console.error('Error fetching solicitudes data:', error);
    }
  }

  actualizarSolicitudes() {
    if (this.authService.isArrendador() && this.arrendador.idCuenta) {
      this.loadSolicitudesData(this.arrendador.idCuenta);
    }
  }
}
