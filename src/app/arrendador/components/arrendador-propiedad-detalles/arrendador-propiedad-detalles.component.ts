import { Component, OnInit } from '@angular/core';
import { ArrendadorNavbarComponent } from '../arrendador-navbar/arrendador-navbar.component';
import { PropiedadDetallesComponent } from '../../../common/components/propiedad-detalles/propiedad-detalles.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { PropiedadService } from '../../../common/services/propiedad.service';
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';
import { SolicitudCardComponent } from "../../../common/components/solicitud-card/solicitud-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrendador-propiedad-detalles',
  standalone: true,
  imports: [PropiedadDetallesComponent, SolicitudCardComponent, CommonModule],
  templateUrl: './arrendador-propiedad-detalles.component.html',
  styleUrl: './arrendador-propiedad-detalles.component.css'
})
export class ArrendadorPropiedadDetallesComponent implements OnInit{
  propiedad: PropiedadDTO = new PropiedadDTO();
  isArrendador = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private propiedadService: PropiedadService
  ){}

  ngOnInit(): void {
    let idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {

    }

    this.route.params.subscribe(params => {
      if (params['id']) {
        let propiedadId = params['id'];
        this.loadPropiedad(propiedadId);
      }
    });
  }

  async loadPropiedad(propiedadId: number) {
    this.propiedad = await this.propiedadService.getPropiedad(propiedadId)
  }

  async actualizarSolicitudes(){
    await this.loadPropiedad(this.propiedad.idPropiedad);
  }
}
