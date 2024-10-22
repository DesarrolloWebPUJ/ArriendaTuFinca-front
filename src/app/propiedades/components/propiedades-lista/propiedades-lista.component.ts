import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../../common/services/propiedades.service';
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';  // Importa el modelo correcto

@Component({
  selector: 'app-propiedades-lista',
  templateUrl: './propiedades-lista.component.html',
  styleUrls: ['./propiedades-lista.component.css']
})
export class PropiedadesListComponent implements OnInit {
  propiedades: PropiedadDTO[] = [];  // Usa el modelo correcto

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.getPropiedades();
  }

  getPropiedades(): void {
    this.propiedadService.getPropiedades().subscribe((data: PropiedadDTO[]) => {
      this.propiedades = data;
    });
  }
}