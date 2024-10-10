import { CuentaDTO } from "../CuentaDTO";
import { BasePropiedadDTO } from "./BasePropiedadDTO";

export class PropiedadDTO extends BasePropiedadDTO{
    arrendador: CuentaDTO;

    constructor(idPropiedad: number, nombrePropiedad: string, descripcionPropiedad: string, municipio: string, departamento: string, tipoIngreso: string, cantidadHabitaciones: number, cantidadBanos: number, permiteMascotas: boolean, tienePiscina: boolean, tieneAsador: boolean, valorNoche: number, estado: string, puntajePromedio: number, cantidadCalificaciones: number, arrendador: CuentaDTO){
        super(idPropiedad, nombrePropiedad, descripcionPropiedad, municipio, departamento, tipoIngreso, cantidadHabitaciones, cantidadBanos, permiteMascotas, tienePiscina, tieneAsador, valorNoche, estado, puntajePromedio, cantidadCalificaciones);
        this.arrendador = arrendador;
    }
}