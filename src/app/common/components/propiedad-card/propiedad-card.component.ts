import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePropiedadDTO } from '../../models/Propiedad/BasePropiedadDTO';
import { SimplePropiedadDTO } from '../../models/Propiedad/SimplePropiedadDTO';
import { PropiedadBotonesComponent } from "../propiedad-botones/propiedad-botones.component";

@Component({
  selector: 'app-propiedad-card',
  standalone: true,
  imports: [CommonModule, RouterModule, PropiedadBotonesComponent],
  templateUrl: './propiedad-card.component.html',
  styleUrl: './propiedad-card.component.css'
})
export class PropiedadCardComponent {
  @Input() propiedades: SimplePropiedadDTO[] = [];
  @Input() isArrendador: boolean = false;
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
}
