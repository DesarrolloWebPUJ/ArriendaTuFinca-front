export class BaseSolicitudDTO{
    idSolicitud: number;
    fechaInicio: string;
    fechaFin: string;
    fechaCreacion: string;
    cantidadPersonas: number;

    constructor(idSolicitud: number, fechaInicio: string, fechaFin: string, fechaCreacion: string, cantidadPersonas: number){
        this.idSolicitud = idSolicitud;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaCreacion = fechaCreacion;
        this.cantidadPersonas = cantidadPersonas;
    }
}