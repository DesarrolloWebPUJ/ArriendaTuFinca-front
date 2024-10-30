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
    const solicitudFormateada = this.formatearSolicitud(solicitud);
    return axios.post<SolicitudDTO>(`${this.apiUrl}`, solicitudFormateada)
      .then(response => response.data);
  }

  getSolicitudesPorPropiedad(propiedadId: number): Promise<SolicitudDTO[]> {
    return axios.get<SolicitudDTO[]>(`${this.apiUrl}/propiedad/${propiedadId}`)
      .then(response => response.data);
  }

  aprobarSolicitud(solicitudId: number): Promise<SolicitudDTO> {
    return axios.put<SolicitudDTO>(`${this.apiUrl}/aprobar/${solicitudId}`)
      .then(response => response.data);
  }

  rechazarSolicitud(solicitudId: number): Promise<SolicitudDTO> {
    return axios.put<SolicitudDTO>(`${this.apiUrl}/rechazar/${solicitudId}`)
      .then(response => response.data);
  }

  pagarSolicitud(solicitudId: number): Promise<SolicitudDTO> {
    return axios.put<SolicitudDTO>(`${this.apiUrl}/pagar/${solicitudId}`)
      .then(response => response.data);
  }

  private formatearSolicitud(solicitud: SolicitudDTO): any {
    const formatearFecha = (fecha: Date): string => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())}T${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
    };

    return {
      ...solicitud,
      fechaInicio: formatearFecha(solicitud.fechaInicio),
      fechaFinal: formatearFecha(solicitud.fechaFinal),
      fechaCreacion: formatearFecha(solicitud.fechaCreacion),
    };
  }
}

