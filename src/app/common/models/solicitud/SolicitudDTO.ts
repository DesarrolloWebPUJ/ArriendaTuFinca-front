import { CuentaDTO } from "../CuentaDTO";
import { EstadoSolicitudDTO } from "../EstadoSolicitudDTO";
import { SimplePropiedadDTO } from "../Propiedad/SimplePropiedadDTO";
import { BaseSolicitudDTO } from "./BaseSolicitudDTO";

export class SolicitudDTO extends BaseSolicitudDTO {
    arrendatario?: CuentaDTO;
    propiedad?: SimplePropiedadDTO;

    constructor(init?: Partial<SolicitudDTO>) {
        super(init);
        Object.assign(this, init);
    }
}
