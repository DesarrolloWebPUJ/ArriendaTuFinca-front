import { Component } from '@angular/core';
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { FechaYHoraPipe } from "../../../common/pipes/fecha-yhora.pipe";
import { AuthService } from '../../../common/services/auth.service';
import { PropiedadCardComponent } from '../../../common/components/propiedad-card/propiedad-card.component';
import { SolicitudCardComponent } from "../../../common/components/solicitud-card/solicitud-card.component";
import { PropiedadService } from '../../../common/services/propiedad.service';
import { SimplePropiedadDTO } from '../../../common/models/Propiedad/SimplePropiedadDTO';
import { SolicitudStatus } from '../../../common/models/enums/SolicitudStatus';

@Component({
  selector: 'app-arrendador-inicio',
  standalone: true,
  imports: [NgIf, RouterModule, PropiedadCardComponent, SolicitudCardComponent],
  templateUrl: './arrendador-inicio.component.html',
  styleUrl: './arrendador-inicio.component.css'
})
export class ArrendadorInicioComponent {

  private readonly maxSolicitudes : number = 5;
  private readonly maxPropiedades : number = 3;

  arrendador: ArrendadorDTO = new ArrendadorDTO();
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
  solicitudes: SolicitudDTO[] = [];
  propiedades: SimplePropiedadDTO[] = [];
  solicitudesCargadas = false;
  isArrendador: boolean = true;

  solicitud = {
    propiedad: {
      nombrePropiedad: ''
    }
  };

  constructor(
    private arrendadorService: ArrendadorService,
    private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.loadArrendadorData(idArrendador);
      this.loadSolicitudesData(idArrendador);
      this.loadRandomPropiedades(idArrendador);
    }
  }

  private async loadArrendadorData(idArrendador: number): Promise<void> {
    try {
      this.arrendador = await this.arrendadorService.getArrendador(idArrendador);
    } catch (error) {
      console.error('Error fetching arrendador data:', error);
    }
  }

  private async loadRandomPropiedades(idArrendador: number){
    let tmpPropiedades = await this.propiedadService.getPropiedadesByArrendador(idArrendador);

    if(tmpPropiedades.length > this.maxPropiedades){
      let randomPropiedades = [];
      let randomIndex = 0;
      for(let i = 0; i < this.maxPropiedades; i++){
        randomIndex = Math.floor(Math.random() * tmpPropiedades.length);
        randomPropiedades.push(tmpPropiedades[randomIndex]);
        tmpPropiedades.splice(randomIndex, 1);
      }
      this.propiedades = randomPropiedades;
    } else {
      this.propiedades = tmpPropiedades;
    }
  }

  private async loadSolicitudesData(idArrendador: number): Promise<void> {
    try {
      let solicitudes = await this.solicitudService.getTopRecentSolicitudesByArrendador(idArrendador, this.maxSolicitudes);
      this.solicitudes = this.filtrarSolicitudes(solicitudes);
      this.solicitudesCargadas = true;
    } catch (error) {
      console.error('Error fetching solicitudes data:', error);
    }
  }

  private filtrarSolicitudes(solicitudes: SolicitudDTO[]): SolicitudDTO[] {
    return solicitudes.filter(solicitud => 
      solicitud.estadoSolicitud.nombreEstadoSolicitud !== SolicitudStatus.Cerrada &&
      solicitud.estadoSolicitud.nombreEstadoSolicitud !== SolicitudStatus.Rechazada);
  }

  actualizarSolicitudes() {
    if (this.authService.isArrendador() && this.arrendador.idCuenta) {
      this.loadSolicitudesData(this.arrendador.idCuenta);
    }
  }

}
