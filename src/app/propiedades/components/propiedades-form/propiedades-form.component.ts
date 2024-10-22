import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadService } from '../../../common/services/propiedades.service';
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';


@Component({
  selector: 'app-propiedades-form',
  templateUrl: './propiedades-form.component.html',
  styleUrls: ['./propiedades-form.component.css']
})
export class PropiedadesFormComponent  {
  propiedadForm: FormGroup;
  propiedadId: number | null = null;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.propiedadForm = this.fb.group({
      nombrePropiedad: ['', Validators.required],
      descripcionPropiedad: ['', Validators.required],
      municipio: ['', Validators.required],
      departamento: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      cantidadHabitaciones: ['', [Validators.required, Validators.min(1)]],
      cantidadBanos: ['', [Validators.required, Validators.min(1)]],
      permiteMascotas: [false],
      tienePiscina: [false],
      tieneAsador: [false],
      valorNoche: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.propiedadId = +params['id'];
        this.editMode = true;
        this.loadPropiedad();
      }
    });
  }

  // Cargar propiedad si estamos en modo edición
  loadPropiedad(): void {
    if (this.propiedadId) {
      this.propiedadService.getPropiedad(this.propiedadId).subscribe((propiedad: PropiedadDTO) => {
        this.propiedadForm.patchValue({
          nombrePropiedad: propiedad.nombrePropiedad,
          descripcionPropiedad: propiedad.descripcionPropiedad,
          municipio: propiedad.municipio,
          departamento: propiedad.departamento,
          tipoIngreso: propiedad.tipoIngreso,
          cantidadHabitaciones: propiedad.cantidadHabitaciones,
          cantidadBanos: propiedad.cantidadBanos,
          permiteMascotas: propiedad.permiteMascotas,
          tienePiscina: propiedad.tienePiscina,
          tieneAsador: propiedad.tieneAsador,
          valorNoche: propiedad.valorNoche
        });
      });
    }
  }

  // Guardar o actualizar propiedad
  savePropiedad(): void {
    if (this.propiedadForm.invalid) {
      return;
    }

    const propiedadData: PropiedadDTO = {
      ...this.propiedadForm.value,
      idPropiedad: this.propiedadId || 0,
      arrendador: { idCuenta: 1, nombre: 'Arrendador Placeholder' },  // Arrendador temporal
      solicitudes: [],
      puntajePromedio: 0,
      cantidadCalificaciones: 0,
      estado: 'ACTIVE'
    };

    if (this.editMode) {
      this.propiedadService.updatePropiedad(propiedadData).subscribe(() => {
        this.router.navigate(['/propiedades']);
      });
    } else {
      this.propiedadService.createPropiedad(propiedadData).subscribe(() => {
        this.router.navigate(['/propiedades']);
      });
    }
  }
}

