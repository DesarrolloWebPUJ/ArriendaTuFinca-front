import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CuentaDTO } from '../models/CuentaDTO';
import { ArrendatarioDTO } from '../models/ArrendatarioDTO';
import axios from '../interceptors/axios-config';

@Injectable({
  providedIn: 'root'
})
export class ArrendatarioService {

  private apiUrl = environment.apiUrl + '/arrendatario';

  constructor() { }

  getArrendatarios(): Promise<CuentaDTO[]> {
    return axios.get<CuentaDTO[]>(this.apiUrl).then(response => response.data);
  }

  getArrendatario(id: number): Promise<ArrendatarioDTO> {
    return axios.get<ArrendatarioDTO>(`${this.apiUrl}/${id}`).then(response => response.data);
  }

  saveNewArrendatario(arrendatario: CuentaDTO, contrasena: String): Promise<CuentaDTO> {
    return axios.post<CuentaDTO>(this.apiUrl, {cuenta: arrendatario, contrasena}).then(response => response.data);
  }

  updateArrendatario(arrendatario: CuentaDTO): Promise<CuentaDTO> {
    return axios.put<CuentaDTO>(this.apiUrl, arrendatario).then(response => response.data);
  }

  deleteArrendatario(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`).then(response => response.data);
  }
}
