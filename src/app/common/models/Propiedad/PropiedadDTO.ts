import { CuentaDTO } from "../CuentaDTO";
import { SolicitudDTO } from "../solicitud/SolicitudDTO";
import { BasePropiedadDTO } from "./BasePropiedadDTO";

export class PropiedadDTO extends BasePropiedadDTO {
    arrendador: CuentaDTO = new CuentaDTO();
    solicitudes: SolicitudDTO[] = [];

    constructor(init?: Partial<PropiedadDTO>) {
        super(init);
        Object.assign(this, init);
    }
}