import { Component, Input } from '@angular/core';
import { BasePropiedadDTO } from '../../models/Propiedad/BasePropiedadDTO';

@Component({
  selector: 'app-propiedad-detalles',
  standalone: true,
  imports: [],
  templateUrl: './propiedad-detalles.component.html',
  styleUrl: './propiedad-detalles.component.css'
})
export class PropiedadDetallesComponent {
  @Input() propiedad: any;
  @Input() isArrendador: boolean = false;
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
}
