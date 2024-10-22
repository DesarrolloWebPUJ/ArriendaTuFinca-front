import { Component, OnInit } from '@angular/core';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldErrorDirective } from '../../../common/directives/form-field-error.directive';
import { PropiedadService } from '../../../common/services/propiedad.service';
import { AuthService } from '../../../common/services/auth.service';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [ArrendadorNavbarComponent, CommonModule, ReactiveFormsModule, FormFieldErrorDirective, NgSelectComponent, NgOptionTemplateDirective, NgLabelTemplateDirective],
  templateUrl: './crear-propiedad.component.html',
  styleUrls: ['./crear-propiedad.component.css']
})
export class CrearPropiedadComponent implements OnInit{
  propiedadForm!: FormGroup;
  departamentos: String[] = [];
  municipios: String[] = [];
  departamentoSeleccionado: string | null = null;

  constructor(private fb: FormBuilder, 
    private propiedadService: PropiedadService,
    private authService: AuthService
  ) {
    this.propiedadForm = this.initForm(fb);
  }

  ngOnInit(): void {
    let idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.loadDepartamentos();
    }

    this.propiedadForm.get('departamento')?.valueChanges.subscribe(value => {
      console.log('Valor del departamento:', value);
    });
  }

  initForm(fb: FormBuilder) {
    return fb.group({
      nombre: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      descripcion: ['', Validators.required],
      habitaciones: ['', Validators.required],
      baños: ['', Validators.required],
      mascotas: [false, Validators.required],
      piscina: [false, Validators.required],
      asador: [false, Validators.required],
      valorNoche: ['', Validators.required]
      })
  }

  private async loadDepartamentos(){
    this.departamentos = await this.propiedadService.getDepartamentos();
  }

  async onDepartamentoChange(departamento: String) {
    if (departamento) {
      console.log('Departamento seleccionado:', this.departamentoSeleccionado);
      this.municipios = await this.propiedadService.getMunicipios(departamento);
      this.propiedadForm.get('municipio')!.reset(); 
    }
  }

  onSubmit(): void {
    if (this.propiedadForm.valid) {
      // Lógica para enviar el formulario
      console.log(this.propiedadForm.value);
    }
  }
}
