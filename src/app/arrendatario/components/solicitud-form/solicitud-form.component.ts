import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../../common/services/solicitud.service';
import { PropiedadService } from '../../../common/services/propiedad.service';
import { AuthService } from '../../../common/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudDTO } from '../../../common/models/solicitud/SolicitudDTO';
import { EstadoSolicitudDTO } from '../../../common/models/EstadoSolicitudDTO';
import { ArrendatarioNavbarComponent } from "../arrendatario-navbar/arrendatario-navbar.component";
import { CommonModule } from '@angular/common';
import { FormFieldErrorDirective } from '../../../common/directives/form-field-error.directive';
import { NgSelectComponent, NgOptionTemplateDirective, NgLabelTemplateDirective } from '@ng-select/ng-select';
import { PropiedadDTO } from '../../../common/models/Propiedad/PropiedadDTO';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.css'],
  standalone: true,
  imports: [ArrendatarioNavbarComponent, CommonModule, ReactiveFormsModule, FormFieldErrorDirective, NgSelectComponent, NgOptionTemplateDirective, NgLabelTemplateDirective],
})
export class SolicitudFormComponent implements OnInit {
  solicitudForm!: FormGroup;
  propiedadId: number | null = null;
  propiedad!: PropiedadDTO;  // Para almacenar la propiedad completa
  idArrendador: number | null = null;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.solicitudForm = this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.propiedadId = +params['id'];
        await this.loadPropiedad();
      }
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      cantidadPersonas: ['', [Validators.required, Validators.min(1)]],
    });
  }

  async loadPropiedad(): Promise<void> {
    if (this.propiedadId) {
      try {
        this.propiedad = await this.propiedadService.getPropiedad(this.propiedadId);
        this.idArrendador = this.propiedad.arrendador?.idCuenta ?? null; // Manejo seguro para evitar undefined
      } catch (error) {
        console.error("Error al cargar la propiedad", error);
      }
    }
  }

  onSubmit(): void {
    if (this.solicitudForm.valid && this.propiedadId && this.idArrendador !== null) {
      const arrendatarioId = this.authService.getCurrentUser()?.idCuenta;
      if (arrendatarioId) {
        const solicitud = this.getSolicitudData(arrendatarioId);
        this.sendSolicitud(solicitud);
      }
    } else {
      console.log("Formulario inválido o datos de propiedad incompletos");
    }
  }

  getSolicitudData(arrendatarioId: number): SolicitudDTO {
    return {
      idSolicitud: 0,
      arrendatario: { idCuenta: arrendatarioId },
      propiedad: this.propiedad,  // Enviamos la propiedad completa en lugar de solo el ID
      estadoSolicitud: new EstadoSolicitudDTO(0, "PENDIENTE"), // Estado inicial para una nueva solicitud
      fechaInicio: this.solicitudForm.get('fechaInicio')?.value,
      fechaFinal: this.solicitudForm.get('fechaFinal')?.value,
      fechaCreacion: new Date(),
      cantidadPersonas: this.solicitudForm.get('cantidadPersonas')?.value,
      valor: this.solicitudForm.get('valor')?.value,
      arrendadorCalificado: false,
      arrendatarioCalificado: false,
      propiedadCalificado: false
    };
  }

  async sendSolicitud(solicitud: SolicitudDTO) {
    try {
      const nuevaSolicitud = await this.solicitudService.crearSolicitud(solicitud);
      if (typeof window !== 'undefined') {
        alert('Solicitud creada correctamente');
      }
      this.router.navigate(['/arrendatario']);
    } catch (error) {
      alert('Error al crear la solicitud');
      console.error(error);
    }
  }
}
