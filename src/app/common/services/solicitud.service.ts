import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { SolicitudDTO } from '../models/solicitud/SolicitudDTO';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = environment.apiUrl + '/solicitud';

  constructor() { }

  getTopRecentSolicitudesByArrendador(arrendadorId: number, maxSolicitudes: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/arrendador/${arrendadorId}?limit=${maxSolicitudes}`).then(response => response.data);
  }
}
