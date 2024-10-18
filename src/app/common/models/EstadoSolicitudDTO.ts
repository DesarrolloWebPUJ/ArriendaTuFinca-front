export class EstadoSolicitudDTO {
    idEstadoSolicitud: number;
    nombreEstadoSolicitud: string;

    constructor(idEstadoSolicitud: number, nombreEstadoSolicitud: string) {
        this.idEstadoSolicitud = idEstadoSolicitud;
        this.nombreEstadoSolicitud = nombreEstadoSolicitud;
    }
}