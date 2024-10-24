import { EstadoSolicitudDTO } from "../EstadoSolicitudDTO";

export class BaseSolicitudDTO {
    idSolicitud: number;
    fechaInicio: Date;
    fechaFinal: Date;
    fechaCreacion: Date;
    cantidadPersonas: number;
    valor: number;
    arrendadorCalificado: boolean;
    arrendatarioCalificado: boolean;
    propiedadCalificado: boolean;
    estadoSolicitud: EstadoSolicitudDTO;

    constructor(
        idSolicitud: number,
        fechaInicio: Date,
        fechaFinal: Date,
        fechaCreacion: Date,
        cantidadPersonas: number,
        valor: number,
        arrendadorCalificado: boolean,
        arrendatarioCalificado: boolean,
        propiedadCalificado: boolean,
        estadoSolicitud: EstadoSolicitudDTO
    ) {
        this.idSolicitud = idSolicitud;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.fechaCreacion = fechaCreacion;
        this.cantidadPersonas = cantidadPersonas;
        this.valor = valor;
        this.arrendadorCalificado = arrendadorCalificado;
        this.arrendatarioCalificado = arrendatarioCalificado;
        this.propiedadCalificado = propiedadCalificado;
        this.estadoSolicitud = estadoSolicitud;
    }
}