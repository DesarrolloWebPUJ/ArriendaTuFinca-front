import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalificacionService } from '../../services/calificación.service';

@Component({
  selector: 'app-calificacion-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './calificacion-form.component.html',
  styleUrls: ['./calificacion-form.component.css']
})
export class CalificacionFormComponent {
  @Input() entityType!: 'arrendador' | 'arrendatario'; // Tipo de entidad a calificar
  @Input() entityId!: number;
  calificacionForm: FormGroup;

  constructor(private fb: FormBuilder, private calificacionService: CalificacionService) {
    this.calificacionForm = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submitForm() {
    if (this.calificacionForm.valid) {
      this.calificacionService
        .submitCalificacion(this.calificacionForm.value)
        .subscribe({
          next: () => alert('Calificación enviada con éxito'),
          error: () => alert('Ocurrió un error al enviar la calificación'),
        });
    }
  }
}

