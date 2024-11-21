import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropiedadService } from '../../services/propiedad.service';
import { SimplePropiedadDTO } from '../../models/Propiedad/SimplePropiedadDTO';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-propiedad-botones',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, MatButtonModule],
  templateUrl: './propiedad-botones.component.html',
  styleUrl: './propiedad-botones.component.css'
})
export class PropiedadBotonesComponent {
  @Input() propiedad : SimplePropiedadDTO = new SimplePropiedadDTO();
  isArrendador : boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  esPropietario() : boolean{
    return this.propiedad.arrendador.idCuenta === this.authService.getCurrentUser()?.idCuenta;
  }

  mostrarBotonEditar(){
    return this.authService.isArrendador() && this.esPropietario();
  }

  mostrarBotonEliminar(){
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

  eliminarPropiedad(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar esta propiedad?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const propiedadService = new PropiedadService();
        propiedadService.desactivarPropiedad(this.propiedad.idPropiedad);
        window.location.reload();
        console.log('Propiedad eliminada');
      }
    });

  }

}
