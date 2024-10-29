import { CuentaDTO } from "../CuentaDTO";
import { EstadoSolicitudDTO } from "../EstadoSolicitudDTO";
import { SimplePropiedadDTO } from "../Propiedad/SimplePropiedadDTO";
import { BaseSolicitudDTO } from "./BaseSolicitudDTO";

export class SolicitudDTO extends BaseSolicitudDTO {
    arrendatario?: CuentaDTO;
    propiedad?: SimplePropiedadDTO;

    constructor(
        idSolicitud: number = 0,
        fechaInicio: Date = new Date(),
        fechaFinal: Date = new Date(),
        fechaCreacion: Date = new Date(),
        cantidadPersonas: number = 1,
        valor: number = 0,
        arrendadorCalificado: boolean = false,
        arrendatarioCalificado: boolean = false,
        propiedadCalificado: boolean = false,
        estadoSolicitud: EstadoSolicitudDTO = { idEstadoSolicitud: 0, nombreEstadoSolicitud: 'Pendiente' },
        arrendatario?: CuentaDTO,
        propiedad?: SimplePropiedadDTO
    ) {
        super(
            idSolicitud,
            fechaInicio,
            fechaFinal,
            fechaCreacion,
            cantidadPersonas,
            valor,
            arrendadorCalificado,
            arrendatarioCalificado,
            propiedadCalificado,
            estadoSolicitud
        );
        this.arrendatario = arrendatario;
        this.propiedad = propiedad;
    }
}
