import { PropiedadDTO } from './../models/Propiedad/PropiedadDTO';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentaDTO } from '../models/CuentaDTO';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
    private apiUrl = environment.apiUrl + '/propiedad'; // La URL base de tu API en Spring

    constructor(private http: HttpClient) { }

    // Obtener todas las propiedades
    getPropiedades(): Observable<PropiedadDTO[]> {
      return this.http.get<PropiedadDTO[]>(`${this.apiUrl}`);
    }
  
    // Obtener una propiedad por ID
    getPropiedad(id: number): Observable<PropiedadDTO> {
      return this.http.get<PropiedadDTO>(`${this.apiUrl}/${id}`);
    }
  
    // Crear una nueva propiedad
    createPropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
      return this.http.post<PropiedadDTO>(this.apiUrl, propiedad);
    }
  
    // Actualizar una propiedad
    updatePropiedad(propiedad: PropiedadDTO): Observable<PropiedadDTO> {
      return this.http.put<PropiedadDTO>(this.apiUrl, propiedad);
    }
  
    // Eliminar (desactivar) una propiedad
    deletePropiedad(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }