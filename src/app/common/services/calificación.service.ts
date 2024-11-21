import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private apiUrl = 'http://localhost:8080/api/calificacion'; // Cambia a tu URL base

  constructor(private http: HttpClient) {}

  getCalificaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getCalificacionesPendientes(idCalificador: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calificado/${idCalificador}`);
  }

  createCalificacion(calificacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, calificacion);
  }
  getCalificacionesArrendador(idArrendador: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/calificado/${idArrendador}`);
  }
}

