import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropiedadService } from '../../services/propiedad.service';
import { SimplePropiedadDTO } from '../../models/Propiedad/SimplePropiedadDTO';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-propiedad-botones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './propiedad-botones.component.html',
  styleUrl: './propiedad-botones.component.css'
})
export class PropiedadBotonesComponent {
  @Input() propiedad : SimplePropiedadDTO = new SimplePropiedadDTO();
  isArrendador : boolean = false;

  constructor(
    private authService: AuthService,
  ) {}

  esPropietario() : boolean{
    return this.propiedad.arrendador.idCuenta === this.authService.getCurrentUser()?.idCuenta;
  }

  mostrarBotonEditar(){
    return this.authService.isArrendador() && this.esPropietario();
  }

  mostrarArrendadorVerDetalles(){
    return this.authService.isArrendador()
  }

  mostrarArrendatarioVerDetalles(){
    return !this.authService.isArrendador()
  }

  mostrarCrearSolicitud(){
    return !this.authService.isArrendador()
  }


}
