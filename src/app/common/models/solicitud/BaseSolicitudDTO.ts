import { EstadoSolicitudDTO } from "../EstadoSolicitudDTO";

export class BaseSolicitudDTO {
    idSolicitud: number;
    fechaInicio: Date;
    fechaFin: Date;
    fechaCreacion: Date;
    cantidadPersonas: number;
    arrendadorCalificado: boolean;
    arrendatarioCalificado: boolean;
    propiedadCalificado: boolean;
    estadoSolicitud: EstadoSolicitudDTO;

    constructor(
        idSolicitud: number,
        fechaInicio: Date,
        fechaFin: Date,
        fechaCreacion: Date,
        cantidadPersonas: number,
        arrendadorCalificado: boolean,
        arrendatarioCalificado: boolean,
        propiedadCalificado: boolean,
        estadoSolicitud: EstadoSolicitudDTO
    ) {
        this.idSolicitud = idSolicitud;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaCreacion = fechaCreacion;
        this.cantidadPersonas = cantidadPersonas;
        this.arrendadorCalificado = arrendadorCalificado;
        this.arrendatarioCalificado = arrendatarioCalificado;
        this.propiedadCalificado = propiedadCalificado;
        this.estadoSolicitud = estadoSolicitud;
    }
}