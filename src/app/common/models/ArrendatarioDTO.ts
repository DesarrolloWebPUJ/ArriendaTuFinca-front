import { CuentaDTO } from "./CuentaDTO";
import { BaseSolicitudDTO } from "./solicitud/BaseSolicitudDTO";

export class ArrendatarioDTO extends CuentaDTO{
    solicitudes : Array<BaseSolicitudDTO>;

    constructor(idCuenta: number, nombreCuenta: string, email: string, solicitudes: Array<BaseSolicitudDTO>){
        super(idCuenta, nombreCuenta, email);
        this.solicitudes = solicitudes;
    }
}