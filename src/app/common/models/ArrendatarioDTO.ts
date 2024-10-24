import { CuentaDTO } from "./CuentaDTO";
import { BaseSolicitudDTO } from "./solicitud/BaseSolicitudDTO";

export class ArrendatarioDTO extends CuentaDTO{
    solicitudes : Array<BaseSolicitudDTO>;

    constructor(idCuenta: number, nombreCuenta: string, apellidoCuenta: string, telefono: string ,email: string, solicitudes: Array<BaseSolicitudDTO>){
        super(idCuenta, nombreCuenta,apellidoCuenta, telefono, email);
        this.solicitudes = solicitudes;
    }
}