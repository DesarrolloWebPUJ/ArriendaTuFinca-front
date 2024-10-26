import { CuentaDTO } from "./CuentaDTO";
import { BaseSolicitudDTO } from "./solicitud/BaseSolicitudDTO";

export class ArrendatarioDTO extends CuentaDTO{
    solicitudes : Array<BaseSolicitudDTO>;

    constructor(
        solicitudes: Array<BaseSolicitudDTO> = []
    ){
        super();
        this.solicitudes = solicitudes;
    }
}