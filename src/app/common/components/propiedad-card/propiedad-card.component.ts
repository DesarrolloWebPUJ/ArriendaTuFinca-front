import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePropiedadDTO } from '../../models/Propiedad/BasePropiedadDTO';

@Component({
  selector: 'app-propiedad-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './propiedad-card.component.html',
  styleUrl: './propiedad-card.component.css'
})
export class PropiedadCardComponent {
  @Input() propiedades: BasePropiedadDTO[] = [];
  @Input() isArrendador: boolean = false;
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
}
