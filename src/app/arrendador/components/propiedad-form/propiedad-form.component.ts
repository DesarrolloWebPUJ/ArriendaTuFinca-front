import { Component, OnInit } from '@angular/core';
import { ArrendadorNavbarComponent } from "../arrendador-navbar/arrendador-navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldErrorDirective } from '../../../common/directives/form-field-error.directive';
import { PropiedadService } from '../../../common/services/propiedad.service';
import { AuthService } from '../../../common/services/auth.service';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';
import { CuentaDTO } from '../../../common/models/CuentaDTO';
import { SimplePropiedadDTO } from '../../../common/models/Propiedad/SimplePropiedadDTO';

@Component({
  selector: 'app-crear-propiedad',
  standalone: true,
  imports: [ArrendadorNavbarComponent, CommonModule, ReactiveFormsModule, FormFieldErrorDirective, NgSelectComponent, NgOptionTemplateDirective, NgLabelTemplateDirective],
  templateUrl: './propiedad-form.component.html',
  styleUrls: ['./propiedad-form.component.css']
})
export class PropiedadFormComponent implements OnInit{
  propiedadForm!: FormGroup;
  departamentos: String[] = [];
  municipios: String[] = [];
  departamentoSeleccionado: string | null = null;
  propiedadId: number | null = null;
  editMode = false;
  propiedadInicializada = false;

  constructor(private fb: FormBuilder, 
    private propiedadService: PropiedadService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.propiedadForm = this.initForm(fb);
  }

  ngOnInit(): void {
    let idArrendador = this.authService.getCurrentUser()?.idCuenta;
    if (idArrendador) {
      this.loadDepartamentos();
    }

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.propiedadId = params['id'];
        this.editMode = true;
        this.loadPropiedad();
      }
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

  async loadPropiedad(): Promise<void> {
    if (this.propiedadId) {
      const propiedad = await this.propiedadService.getPropiedad(this.propiedadId);
      if (this.isArrendadorCorrecto(propiedad)){
        await this.loadDepartamentos();
        this.propiedadForm.patchValue({
          nombre: propiedad.nombrePropiedad,
          descripcion: propiedad.descripcionPropiedad,
          municipio: propiedad.municipio,
          departamento: propiedad.departamento,
          tipoIngreso: propiedad.tipoIngreso,
          habitaciones: propiedad.cantidadHabitaciones,
          baños: propiedad.cantidadBanos,
          mascotas: propiedad.permiteMascotas,
          piscina: propiedad.tienePiscina,
          asador: propiedad.tieneAsador,
          valorNoche: propiedad.valorNoche
        });
        this.propiedadForm.get('municipio')?.setValue(propiedad.municipio);
        this.propiedadInicializada = true;
      }
      else{
        if (typeof window !== 'undefined') {
          alert('Propiedad no váida');
        }
        this.router.navigate(['/login']);
      }
    }
  }

  private async loadDepartamentos(){
    this.departamentos = await this.propiedadService.getDepartamentos();
  }

  isArrendadorCorrecto(propiedad: PropiedadDTO): boolean {
    return propiedad.arrendador.idCuenta === this.authService.getCurrentUser()?.idCuenta;
  }

  async onDepartamentoChange(departamento: String) {
    if (departamento) {
      console.log('Departamento seleccionado:', this.departamentoSeleccionado);
      this.municipios = await this.propiedadService.getMunicipios(departamento);
      if (!this.propiedadInicializada || !this.editMode) {
        this.propiedadForm.get('municipio')!.reset(); 
      }
    }
  }

  onSubmit(): void {
    if (this.propiedadForm.valid) {
      let arrendador = this.authService.getCurrentUser();
      if (arrendador){
        let propiedad = this.getPropiedad(arrendador);
        this.sendForm(propiedad);
      }
      // Lógica para enviar el formulario
      console.log(this.propiedadForm.value);
    }
  }

  getPropiedad(arrendador: CuentaDTO): SimplePropiedadDTO{
    return new SimplePropiedadDTO(
      this.propiedadId ? this.propiedadId : 0,
      this.propiedadForm.get('nombre')?.value,
      this.propiedadForm.get('descripcion')?.value,
      this.propiedadForm.get('municipio')?.value,
      this.propiedadForm.get('departamento')?.value,
      this.propiedadForm.get('tipoIngreso')?.value,
      this.propiedadForm.get('habitaciones')?.value,
      this.propiedadForm.get('baños')?.value,
      this.propiedadForm.get('mascotas')?.value,
      this.propiedadForm.get('piscina')?.value,
      this.propiedadForm.get('asador')?.value,
      this.propiedadForm.get('valorNoche')?.value,
      'Activa',
      0,
      0,
      arrendador
    );
  }

  async sendForm(propiedad: SimplePropiedadDTO){
    if (this.editMode && this.propiedadId){
      try{
        await this.propiedadService.updatePropiedad(propiedad);
        if (typeof window !== 'undefined') {
          alert('Propiedad actualizada correctamente');
        }
        this.router.navigate(['/arrendador/propiedades', this.propiedadId])
      }catch (error){
        alert(error)
      }
    }
    else{
      try{
        let newPropiedad = await this.propiedadService.saveNewPropiedad(propiedad);
        if (typeof window !== 'undefined') {
          alert('Propiedad creada correctamente');
        }
        this.router.navigate(['/arrendador/propiedades', newPropiedad.idPropiedad])
      }catch (error){
        alert(error)
      }
    }
  }
}
