export class BasePropiedadDTO {
    idPropiedad: number = 0;
    nombrePropiedad: string = '';
    descripcionPropiedad: string = '';
    municipio: string = '';
    departamento: string = '';
    tipoIngreso: string = '';
    cantidadHabitaciones: number = 0;
    cantidadBanos: number = 0;
    permiteMascotas: boolean = false;
    tienePiscina: boolean = false;
    tieneAsador: boolean = false;
    valorNoche: number = 0;
    estado: string = '';
    puntajePromedio: number = 0;
    cantidadCalificaciones: number = 0;

    constructor(init?: Partial<BasePropiedadDTO>) {
        Object.assign(this, init);
    }
}