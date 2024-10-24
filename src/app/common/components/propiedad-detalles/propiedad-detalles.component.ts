import { Component, Input } from '@angular/core';
import { BasePropiedadDTO } from '../../models/Propiedad/BasePropiedadDTO';
import { CostoDineroPipe } from "../../pipes/costo-dinero.pipe";

@Component({
  selector: 'app-propiedad-detalles',
  standalone: true,
  imports: [CostoDineroPipe],
  templateUrl: './propiedad-detalles.component.html',
  styleUrl: './propiedad-detalles.component.css'
})
export class PropiedadDetallesComponent {
  @Input() propiedad: any;
  @Input() isArrendador: boolean = false;
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
}
