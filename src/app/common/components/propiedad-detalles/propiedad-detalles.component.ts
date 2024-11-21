import { Component, Input, SimpleChanges } from '@angular/core';
import { CostoDineroPipe } from "../../pipes/costo-dinero.pipe";
import { BasePropiedadDTO } from '../../models/Propiedad/BasePropiedadDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-propiedad-detalles',
  standalone: true,
  imports: [CostoDineroPipe, NgIf, NgFor],
  templateUrl: './propiedad-detalles.component.html',
  styleUrl: './propiedad-detalles.component.css'
})
export class PropiedadDetallesComponent {
  @Input() propiedad: any;
  @Input() isArrendador: boolean = false;
  defaultPropiedadImagePath = '/assets/sample/propiedad2.jpg';
  selectedFile: File | null = null;
  fotos: string[] = [];
  
  
  constructor(private propiedadService: PropiedadService) {}
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propiedad'] && this.propiedad) {
      this.getFotos();
    }
  }

  async getFotos(){
    if (this.propiedad && this.propiedad.idPropiedad) {
      let fotosUrl = await this.propiedadService.obtainFotos(this.propiedad.idPropiedad);
      await this.requestImages(fotosUrl);
    }
  }

  async requestImages(fotosUrl: string[]){
    this.fotos = [];
    for (let i = 0; i < fotosUrl.length; i++) {
      let foto = await this.propiedadService.getFoto(fotosUrl[i]);
      this.fotos.push(URL.createObjectURL(foto));
    }
    console.log(this.fotos);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onUploadPhoto(event: any) {
    event.preventDefault();
    if (!this.selectedFile || !this.propiedad) {
      console.error('No hay archivo seleccionado o propiedad cargada');
      return;
    }
    else{
      await this.propiedadService.subirFoto(this.propiedad.idPropiedad, this.selectedFile).then(
        () => {
          console.log('Foto subida con éxito');
          window.location.reload();
        }
      );
    }
  }

}
