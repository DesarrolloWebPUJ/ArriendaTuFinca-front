import { EstadoSolicitudDTO } from "../EstadoSolicitudDTO";

export class BaseSolicitudDTO {
    idSolicitud: number = 0;
    fechaInicio: Date = new Date();
    fechaFinal: Date = new Date();
    fechaCreacion: Date = new Date();
    cantidadPersonas: number = 1;
    valor: number = 0;
    arrendadorCalificado: boolean = false;
    arrendatarioCalificado: boolean = false;
    propiedadCalificado: boolean = false;
    estadoSolicitud: EstadoSolicitudDTO = { idEstadoSolicitud: 0, nombreEstadoSolicitud: 'Pendiente' };

    constructor(init?: Partial<BaseSolicitudDTO>) {
        Object.assign(this, init);
    }
}