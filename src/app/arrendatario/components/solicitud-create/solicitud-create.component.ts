import { Component } from '@angular/core';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitud-create',
  templateUrl: './solicitud-create.component.html',
  styleUrls: ['./solicitud-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SolicitudCreateComponent {
  solicitud: SolicitudDTO = new SolicitudDTO();

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  enviarSolicitud(): void {
    const propiedadId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(propiedadId)) {
      if (this.solicitud.propiedad) {
        this.solicitud.propiedad.idPropiedad = propiedadId;

        this.solicitudService.crearSolicitud(this.solicitud).then(() => {
          alert('Solicitud creada correctamente');
          this.router.navigate(['/propiedades']);
        }).catch((error) => {
          console.error('Error al crear la solicitud:', error);
        });
      } else {
        console.error('La solicitud no está definida.');
      }
    } else {
      console.error('El id de la propiedad no es válido.');
    }
  }
}
