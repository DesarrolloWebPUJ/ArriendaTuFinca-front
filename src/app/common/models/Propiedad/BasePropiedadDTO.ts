export class BasePropiedadDTO{
    idPropiedad: number;
    nombrePropiedad: string;
    descripcionPropiedad: string;
    municipio: string;
    departamento: string;
    tipoIngreso: string;
    cantidadHabitaciones: number;
    cantidadBanos: number;
    permiteMascotas: boolean;
    tienePiscina: boolean;
    tieneAsador: boolean;
    valorNoche: number;
    estado: string;
    puntajePromedio: number;
    cantidadCalificaciones: number;

    constructor(idPropiedad: number, nombrePropiedad: string, descripcionPropiedad: string, municipio: string, departamento: string, tipoIngreso: string, cantidadHabitaciones: number, cantidadBanos: number, permiteMascotas: boolean, tienePiscina: boolean, tieneAsador: boolean, valorNoche: number, estado: string, puntajePromedio: number, cantidadCalificaciones: number){
        this.idPropiedad = idPropiedad;
        this.nombrePropiedad = nombrePropiedad;
        this.descripcionPropiedad = descripcionPropiedad;
        this.municipio = municipio;
        this.departamento = departamento;
        this.tipoIngreso = tipoIngreso;
        this.cantidadHabitaciones = cantidadHabitaciones;
        this.cantidadBanos = cantidadBanos;
        this.permiteMascotas = permiteMascotas;
        this.tienePiscina = tienePiscina;
        this.tieneAsador = tieneAsador;
        this.valorNoche = valorNoche;
        this.estado = estado;
        this.puntajePromedio = puntajePromedio;
        this.cantidadCalificaciones = cantidadCalificaciones;
    }

    
}