import { Component, Input } from '@angular/core';
import { CuentaDTO } from '../../models/CuentaDTO';

@Component({
  selector: 'app-perfil-card',
  standalone: true,
  imports: [],
  templateUrl: './perfil-card.component.html',
  styleUrl: './perfil-card.component.css'
})
export class PerfilCardComponent {
  @Input() usuario: CuentaDTO = new CuentaDTO();
  usuarioDefaultImagePath = '/assets/sample/user_foto.jpg';
}
