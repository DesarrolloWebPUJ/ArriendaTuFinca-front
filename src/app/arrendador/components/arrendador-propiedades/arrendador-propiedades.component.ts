import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BasePropiedadDTO } from '../../../common/models/Propiedad/BasePropiedadDTO';
import { PropiedadCardComponent } from '../../../common/components/propiedad-card/propiedad-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../common/services/auth.service';
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";

@Component({
  selector: 'app-arrendador-propiedades',
  standalone: true,
  imports: [RouterModule, PropiedadCardComponent, CommonModule, ArrendadorNavbarComponent, ArrendadorNavbarComponent],
  templateUrl: './arrendador-propiedades.component.html',
  styleUrl: './arrendador-propiedades.component.css'
})
export class ArrendadorPropiedadesComponent implements OnInit{
  isArrendador = true;
  propiedades : BasePropiedadDTO[] = [];
  arrendador: ArrendadorDTO = new ArrendadorDTO();

  constructor(
    private router : Router,
    private authService: AuthService,
    private arrendadorService: ArrendadorService
  ){

  }

  ngOnInit(): void {
    let idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.loadArrendadorData(idArrendador);
    }
  }

  private async loadArrendadorData(idArrendador: number): Promise<void> {
    try {
      this.arrendador = await this.arrendadorService.getArrendador(idArrendador);
      this.propiedades = this.arrendador.propiedades;
    } catch (error) {
      console.error('Error fetching arrendador data:', error);
    }
  }
}
