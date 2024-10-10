import { CuentaDTO } from "../CuentaDTO";
import { BaseSolicitudDTO } from "./BaseSolicitudDTO";

export class SolicitudDTO extends BaseSolicitudDTO{
    arrendatario: CuentaDTO;

    constructor(idSolicitud: number, fechaInicio: string, fechaFin: string, fechaCreacion: string, cantidadPersonas: number, arrendatario: CuentaDTO){
        super(idSolicitud, fechaInicio, fechaFin, fechaCreacion, cantidadPersonas);
        this.arrendatario = arrendatario;
    }
}