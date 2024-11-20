import { Component, Input } from '@angular/core';
import { CostoDineroPipe } from "../../pipes/costo-dinero.pipe";
import { BasePropiedadDTO } from '../../models/Propiedad/BasePropiedadDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propiedad-detalles',
  standalone: true,
  imports: [CostoDineroPipe],
  templateUrl: './propiedad-detalles.component.html',
  styleUrl: './propiedad-detalles.component.css'
})
export class PropiedadDetallesComponent {
  @Input() propiedad: any;
  @Input() isArrendador: boolean = false;
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
  constructor(private http: HttpClient) {}
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUploadPhoto(event: any): void {
    event.preventDefault();
    if (!this.selectedFile || !this.propiedad) {
      console.error('No hay archivo seleccionado o propiedad cargada');
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.selectedFile);

    this.http.post(`${environment.apiUrl}/api/propiedad/${this.propiedad.idPropiedad}/fotos`, formData)
      .subscribe(response => {
        console.log('Foto subida con éxito', response);
        this.getPropiedad(this.propiedad.idPropiedad);  // Refrescar las fotos
      }, error => {
        console.error('Error al subir la foto', error);
      });
  }

  getPropiedad(id: number): void {
    this.http.get(`${environment.apiUrl}/api/propiedad/${id}`)
      .subscribe((data: any) => {
        this.propiedad = data;
      }, error => {
        console.error('Error al obtener la propiedad', error);
      });
  }
}
