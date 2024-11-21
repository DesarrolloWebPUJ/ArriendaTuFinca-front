import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from '../interceptors/axios-config';
import { PropiedadDTO } from '../models/Propiedad/PropiedadDTO';
import { SimplePropiedadDTO } from '../models/Propiedad/SimplePropiedadDTO';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private apiUrl = environment.apiUrl + '/propiedad';

  constructor() { }

  getDepartamentos() : Promise<String[]> {
    return axios.get<String[]>(`${this.apiUrl}/departamentos`).then(response => response.data);
  }

  getMunicipios(departamento: String) : Promise<String[]> {
    return axios.get<String[]>(`${this.apiUrl}/${departamento}/municipios`).then(response => response.data);
  }

  getPropiedades() : Promise<PropiedadDTO[]> {
    return axios.get<PropiedadDTO[]>(`${this.apiUrl}`).then(response => response.data);
  }

  getPropiedad(id: number) : Promise<PropiedadDTO> {
    return axios.get<PropiedadDTO>(`${this.apiUrl}/${id}`).then(response => response.data);
  }

  getPropiedadesByArrendador(arrendadorId: number): Promise<PropiedadDTO[]> {
    return axios.get<PropiedadDTO[]>(`${this.apiUrl}/arrendador/${arrendadorId}`).then(response => response.data);
  }

  saveNewPropiedad(propiedad: SimplePropiedadDTO) : Promise<SimplePropiedadDTO> {
    return axios.post<SimplePropiedadDTO>(`${this.apiUrl}`, propiedad).then(response => response.data);
  }

  updatePropiedad(propiedad: SimplePropiedadDTO) : Promise<SimplePropiedadDTO> {
    return axios.put<SimplePropiedadDTO>(`${this.apiUrl}`, propiedad).then(response => response.data);
  }

  subirFoto(id: number, foto: File) : Promise<void> {
    const formData = new FormData();
    formData.append('photo', foto);
    return axios.post<void>(`${this.apiUrl}/${id}/fotos`, formData).then(response => response.data);
  }

  obtainFotos(id: number) : Promise<string[]> {
    return axios.get<string[]>(`${this.apiUrl}/${id}/fotos`).then(response => response.data);
  }

  getFoto(filename: string): Promise<Blob> {
    return axios.get<Blob>(`${this.apiUrl}/fotos/${filename}`, {
      responseType: 'blob'
    }).then(response => response.data);
  }

  desactivarPropiedad(id: number) : Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`).then(response => response.data);
  }
}
