import { CuentaDTO } from "../CuentaDTO";
import { EstadoSolicitudDTO } from "../EstadoSolicitudDTO";
import { SimplePropiedadDTO } from "../Propiedad/SimplePropiedadDTO";
import { BaseSolicitudDTO } from "./BaseSolicitudDTO";

export class SolicitudDTO extends BaseSolicitudDTO {
    arrendatario: CuentaDTO;
    propiedad: SimplePropiedadDTO;

    constructor(idSolicitud: number,
        fechaInicio: string,
        fechaFin: string,
        fechaCreacion: string,
        cantidadPersonas: number,
        arrendadorCalificado: boolean,
        arrendatarioCalificado: boolean,
        propiedadCalificado: boolean,
        estadoSolicitud: EstadoSolicitudDTO,
        arrendatario: CuentaDTO,
        propiedad: SimplePropiedadDTO
    ) {
        super(idSolicitud, new Date(fechaInicio), new Date(fechaFin), new Date(fechaCreacion), cantidadPersonas, arrendadorCalificado, arrendatarioCalificado, propiedadCalificado, estadoSolicitud);
        this.arrendatario = arrendatario;
        this.propiedad = propiedad;
    }
}