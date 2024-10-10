import { CuentaDTO } from "./CuentaDTO";
import { BasePropiedadDTO } from "./Propiedad/BasePropiedadDTO";

export class ArrendadorDTO extends CuentaDTO{
    propiedades: Array<BasePropiedadDTO>;

    constructor(
        propiedades: Array<BasePropiedadDTO> = []
    ){
        super();
        this.propiedades = propiedades;
    }
}