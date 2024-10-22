import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

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
}
