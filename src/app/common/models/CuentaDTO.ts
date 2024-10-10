export class CuentaDTO{
    idCuenta?: number | null;
    nombreCuenta?: string | null;
    email?: string | null;

    constructor(
        idCuenta?: number | null,
        nombreCuenta?: string | null,
        email?: string | null,
    ) {
        this.idCuenta = idCuenta;
        this.nombreCuenta = nombreCuenta;
        this.email = email;
    }

}