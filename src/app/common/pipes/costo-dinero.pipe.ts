import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costoDinero',
  standalone: true
})
export class CostoDineroPipe implements PipeTransform {

  transform(value: number): string {
    if (typeof value !== 'number') {
      return '';
    }
    return `$${value.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }

}
