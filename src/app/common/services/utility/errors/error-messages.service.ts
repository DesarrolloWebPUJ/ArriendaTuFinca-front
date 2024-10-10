import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  private errorMessages: { [key: string]: string } = {
    required: 'Este campo no puede ser vacío',
    email: 'Correo inválido',
    minlength: 'Debe tener al menos {requiredLength} caracteres',
    maxlength: 'Debe tener como máximo {requiredLength} caracteres',
    passwordMismatch: 'Las contraseñas no coinciden',
    emailDomain: 'El dominio del correo debe ser {domain}',
    telephone: 'Número telefónico inválido'
  };

  getErrorMessage(errorCode: string, params: any = {}):string{
    let message = this.errorMessages[errorCode] || 'Campo inválido';
    // Reemplaza los parámetros dinámicos (si los hay)
    Object.keys(params).forEach(param => {
      message = message.replace(`{${param}}`, params[param]);
    });
    return message;
  }
}
