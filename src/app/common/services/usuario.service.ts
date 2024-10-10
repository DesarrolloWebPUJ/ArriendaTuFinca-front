import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { CuentaDTO } from '../models/CuentaDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl + '/cuenta';

  constructor() { }

  getCuenta(id: number): Promise<CuentaDTO> {
    return axios.get<CuentaDTO>(this.apiUrl+`/${id}`).then(response => response.data)
  }

  getCuentaByEmail(email: string): Promise<CuentaDTO> {
    return axios.get<CuentaDTO>(this.apiUrl+`/email/${email}`).then(response => response.data);
  }

  getCuentas(): Promise<CuentaDTO[]> {
    return axios.get<CuentaDTO[]>(this.apiUrl).then(response => response.data)
  }

  login(email: string, contrasena: string): Promise<CuentaDTO> {
    return axios.post<CuentaDTO>(this.apiUrl+'/login', { email, contrasena }).then(response => response.data);
  }

  updateCuenta(cuentaDTO: CuentaDTO): Promise<CuentaDTO> {
    return axios.put<CuentaDTO>(this.apiUrl, cuentaDTO).then(response => response.data);
  }

  updateContrasena(cuentaDTO: CuentaDTO, contrasenaIngresada: string, nuevaContrasena: string): Promise<CuentaDTO> {
    return axios.put<CuentaDTO>(this.apiUrl+'/nuevaContrasena', { cuentaDTO, contrasenaIngresada, nuevaContrasena }).then(response => response.data);
  }

  deleteCuenta(id: number): Promise<void> {
    return axios.delete<void>(`/${id}`).then(response => response.data);
  }
}
