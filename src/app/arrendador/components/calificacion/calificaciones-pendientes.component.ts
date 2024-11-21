import { Component, OnInit } from '@angular/core';
import { CalificacionService } from '../../../common/services/calificación.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-calificaciones-pendientes',
  standalone : true,
  imports:[RouterModule],
  templateUrl: './calificaciones-pendientes.component.html',
  styleUrls: ['./calificaciones-pendientes.component.css'],
})
export class CalificacionesPendientesComponent implements OnInit {
  calificacionesPendientes: any[] = [];
  idCalificador: number = 1; // Reemplaza con el ID real del arrendador

  constructor(private calificacionService: CalificacionService) {}

  ngOnInit(): void {
    this.cargarCalificacionesPendientes();
  }

  cargarCalificacionesPendientes(): void {
    this.calificacionService
      .getCalificacionesPendientes(this.idCalificador)
      .subscribe(
        (data) => (this.calificacionesPendientes = data),
        (error) => console.error(error)
      );
  }
}
