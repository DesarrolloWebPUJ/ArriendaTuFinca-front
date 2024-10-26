import { Component, OnInit } from '@angular/core';
import { ArrendatarioNavbarComponent } from "../arrendatario-navbar/arrendatario-navbar.component";
import { PropiedadCardComponent } from "../../../common/components/propiedad-card/propiedad-card.component";
import { BasePropiedadDTO } from '../../../common/models/Propiedad/BasePropiedadDTO';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PropiedadService } from '../../../common/services/propiedad.service';

@Component({
  selector: 'app-arrendatario-buscar-propiedades',
  standalone: true,
  imports: [ArrendatarioNavbarComponent, PropiedadCardComponent, NgSelectComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './arrendatario-buscar-propiedades.component.html',
  styleUrl: './arrendatario-buscar-propiedades.component.css'
})
export class ArrendatarioBuscarPropiedadesComponent implements OnInit{
  searchForm!: FormGroup;
  propiedades: BasePropiedadDTO[] = [];
  filteredPropiedades: BasePropiedadDTO[] = [];
  departamentos: String[] = [];
  municipios: String[] = [];


  constructor(private fb: FormBuilder, private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      nombre: [''],
      departamento: [''],
      municipio: [''],
      cantidadPersonas: ['']
    });

    this.loadPropiedades();
  }

  async loadPropiedades() {
    await this.propiedadService.getPropiedades().then(propiedades => {
      this.propiedades = propiedades;
      this.filteredPropiedades = propiedades;
    });
    await this.propiedadService.getDepartamentos().then(departamentos => {
      this.departamentos = departamentos;
    });
  }

  onSearch(): void {
    const { nombre, departamento, municipio, cantidadPersonas } = this.searchForm.value;
    this.filteredPropiedades = this.propiedades.filter(propiedad => {
      return (
        (!nombre || propiedad.nombrePropiedad.toLowerCase().includes(nombre.toLowerCase())) &&
        (!departamento || propiedad.departamento.toLowerCase().includes(departamento.toLowerCase())) &&
        (!municipio || propiedad.municipio.toLowerCase().includes(municipio.toLowerCase())) &&
        (!cantidadPersonas || propiedad.cantidadHabitaciones >= cantidadPersonas)
      );
    });
  }

  async onDepartamentoChange(departamento: String) {
    if (departamento) {
      this.municipios = await this.propiedadService.getMunicipios(departamento);
      this.searchForm.get('municipio')!.reset(); 
    }
  }

  
}
