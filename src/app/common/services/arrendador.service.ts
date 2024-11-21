import { Injectable } from '@angular/core';
import { CuentaDTO } from '../models/CuentaDTO';
import axios from '../interceptors/axios-config';
import { environment } from '../../../environments/environment';
import { ArrendadorDTO } from '../models/ArrendadorDTO';

@Injectable({
  providedIn: 'root'
})
export class ArrendadorService {

  private apiUrl = environment.apiUrl + '/arrendador';

  constructor() { }

  getArrendadores(): Promise<CuentaDTO[]> {
    return axios.get<CuentaDTO[]>(this.apiUrl).then(response => response.data);
  }

  getArrendador(id: number): Promise<ArrendadorDTO> {
    return axios.get<ArrendadorDTO>(`${this.apiUrl}/${id}`).then(response => response.data);
  }

  saveNewArrendador(arrendador: CuentaDTO, contrasena: String): Promise<CuentaDTO> {
    return axios.post<CuentaDTO>(this.apiUrl, {cuenta: arrendador, contrasena}).then(response => response.data);
  }

  updateArrendador(arrendador: CuentaDTO): Promise<CuentaDTO> {
    return axios.put<CuentaDTO>(this.apiUrl, arrendador).then(response => response.data);
  }

  deleteArrendador(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`).then(response => response.data);
  }
}
