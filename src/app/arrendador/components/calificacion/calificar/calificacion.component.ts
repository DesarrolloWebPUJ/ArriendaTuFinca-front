import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CalificacionService } from '../../../../common/services/calificación.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-calificar', 
  standalone :true, 
  imports :[FormsModule, RouterModule],
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css'],
})
export class CalificarComponent implements OnInit {
  calificaciones: any[] = [];

  constructor(
    private calificacionService: CalificacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const arrendadorId = this.route.snapshot.params['id']; // Obtén el ID del arrendador desde la ruta
    this.calificacionService.getCalificacionesArrendador(arrendadorId).subscribe((data) => {
      this.calificaciones = data;
    });
  }
}
