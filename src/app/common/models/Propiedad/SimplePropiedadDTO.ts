import { CuentaDTO } from "../CuentaDTO";
import { BasePropiedadDTO } from "./BasePropiedadDTO";

export class SimplePropiedadDTO extends BasePropiedadDTO {
    arrendador: CuentaDTO = new CuentaDTO();

    constructor(init?: Partial<SimplePropiedadDTO>) {
        super(init);
        Object.assign(this, init);
    }
}