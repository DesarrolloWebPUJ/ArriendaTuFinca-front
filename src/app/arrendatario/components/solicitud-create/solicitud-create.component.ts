import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArrendatarioNavbarComponent } from "../arrendatario-navbar/arrendatario-navbar.component";
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';
import { PropiedadService } from '../../../common/services/propiedad.service';
import { AuthService } from '../../../common/services/auth.service';
import moment from 'moment';

@Component({
  selector: 'app-solicitud-create',
  templateUrl: './solicitud-create.component.html',
  styleUrls: ['./solicitud-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ArrendatarioNavbarComponent]
})
export class SolicitudCreateComponent implements OnInit{
  solicitud: SolicitudDTO = new SolicitudDTO();
  propiedadId: number | undefined;
  formFechaInicio: string = "";
  formFechaFinal: string = "";

  constructor(
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.propiedadId = params['id'];
      }
    });
  }

  

  async enviarSolicitud() {
    if (this.propiedadId) {
      await this.loadPropiedad();
      if (this.solicitud.propiedad) {
        let user = this.authService.getCurrentUser();
        if (user) {
          this.solicitud.arrendatario = user;
        }

        this.solicitud.fechaInicio = new Date(this.formFechaInicio);
        this.solicitud.fechaFinal = new Date(this.formFechaFinal);

        this.solicitudService.crearSolicitud(this.solicitud).then(() => {
          this.router.navigate(['/arrendatario']);
        }).catch((error) => {
          console.error('Error al enviar la solicitud:', error);
        });
        console.log(this.solicitud);
      } else {
      console.error('El id de la propiedad no es válido.');
      }
    }
  }

  async loadPropiedad(){
    if (this.propiedadId) {
      this.solicitud.propiedad = await this.propiedadService.getPropiedad(this.propiedadId);
    } else {
      console.error('El id de la propiedad no es válido.');
    }
  }
}
