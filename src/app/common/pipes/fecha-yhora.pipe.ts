import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaYHora',
  standalone: true
})
export class FechaYHoraPipe implements PipeTransform {

  transform(value: Date, formato: string = 'dd/MM/yyyy'): string {
    let fecha: Date;

    if (typeof value === 'string' || typeof value === 'number') {
      fecha = new Date(value);
    } else if (value instanceof Date) {
      fecha = value;
    } else {
      return '';
    }

    if (isNaN(fecha.getTime())) {
      return 'Fecha no válida';
    }

    const options: Intl.DateTimeFormatOptions = {};
    
    // Lógica para convertir la fecha según el formato deseado
    if (formato === 'dd/MM/yyyy') {
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = true;
    } else if (formato === 'long') {
      return fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    return fecha.toLocaleTimeString('es-ES', options);
  }

}
