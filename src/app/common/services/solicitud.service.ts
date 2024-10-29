import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { SolicitudDTO } from '../models/solicitud/SolicitudDTO';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = environment.apiUrl + '/solicitud';

  constructor() {}

  getTopRecentSolicitudesByArrendador(arrendadorId: number, maxSolicitudes: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/arrendador/${arrendadorId}?limit=${maxSolicitudes}`)
      .then(response => response.data);
  }

  getSolicitudesByArrendatario(arrendatarioId: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/arrendatario/${arrendatarioId}`)
      .then(response => response.data);
  }

  getSolicitudById(solicitudId: number): Promise<SolicitudDTO> {
    return axios.get<SolicitudDTO>(`${this.apiUrl}/${solicitudId}`)
      .then(response => response.data);
  }

  actualizarEstadoSolicitud(solicitudId: number, nuevoEstado: string): Promise<SolicitudDTO> {
    const endpoint = nuevoEstado === 'Aceptada' ? 'aprobar' : 'rechazar';
    return axios.put<SolicitudDTO>(`${this.apiUrl}/${endpoint}/${solicitudId}`)
      .then(response => response.data);
  }

  crearSolicitud(solicitud: SolicitudDTO): Promise<SolicitudDTO> {
    return axios.post<SolicitudDTO>(`${this.apiUrl}`, solicitud)
      .then(response => response.data);
  }

  getSolicitudesPorPropiedad(propiedadId: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/propiedad/${propiedadId}`)
      .then(response => response.data);
  }
}

