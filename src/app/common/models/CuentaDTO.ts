export class CuentaDTO{
    idCuenta?: number | null;
    nombreCuenta?: string | null;
    apellidoCuenta?: string | null;
    telefono?: string | null;
    email?: string | null;

    constructor(
        idCuenta?: number | null,
        nombreCuenta?: string | null,
        apellidoCuenta?: string | null,
        telefono?: string | null,
        email?: string | null,
    ) {
        this.idCuenta = idCuenta;
        this.nombreCuenta = nombreCuenta;
        this.apellidoCuenta = apellidoCuenta;
        this.telefono = telefono;
        this.email = email;
    }

}