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

  // Obtener las solicitudes más recientes por arrendador, con un límite máximo
  getTopRecentSolicitudesByArrendador(arrendadorId: number, maxSolicitudes: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/arrendador/${arrendadorId}?limit=${maxSolicitudes}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener solicitudes recientes por arrendador:', error);
        throw error;
      });
  }

  // Obtener todas las solicitudes de un arrendatario específico
  getSolicitudesByArrendatario(arrendatarioId: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/arrendatario/${arrendatarioId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener solicitudes por arrendatario:', error);
        throw error;
      });
  }

  // Obtener una solicitud específica por su ID
  getSolicitudById(solicitudId: number): Promise<SolicitudDTO> {
    return axios.get<SolicitudDTO>(`${this.apiUrl}/${solicitudId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener la solicitud por ID:', error);
        throw error;
      });
  }

  // Actualizar el estado de una solicitud (Aceptar/Rechazar)
  actualizarEstadoSolicitud(solicitudId: number, nuevoEstado: string): Promise<SolicitudDTO> {
    const endpoint = nuevoEstado === 'Aceptada' ? 'aprobar' : 'rechazar';
    return axios.put<SolicitudDTO>(`${this.apiUrl}/${endpoint}/${solicitudId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al actualizar el estado de la solicitud:', error);
        throw error;
      });
  }

  // Crear una nueva solicitud
  crearSolicitud(solicitud: SolicitudDTO): Promise<SolicitudDTO> {
    return axios.post<SolicitudDTO>(`${this.apiUrl}`, solicitud)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al crear la solicitud:', error);
        throw error;
      });
  }

  // Obtener todas las solicitudes asociadas a una propiedad específica
  getSolicitudesPorPropiedad(propiedadId: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/propiedad/${propiedadId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al obtener solicitudes por propiedad:', error);
        throw error;
      });
  }
}
