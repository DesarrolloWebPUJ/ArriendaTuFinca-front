import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class CustomValidators{
    static passwordMatchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const password = control.get('password');
          const confirmPassword = control.get('confirmPassword');
          // Verifica que los controles existan antes de proceder
            if (!password || !confirmPassword) {
                console.log('Uno de los controles no existe');
                return null; // si alguno de los campos no existe, no hay validación
            }
  
        return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
        };
      }
      
      // Validador para verificar que el email sea de un dominio específico
      static emailDomainValidator(domain: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const email = control.value;
        if (email && email.indexOf('@') !== -1) {
          const [_, emailDomain] = email.split('@');
          if (emailDomain !== domain) {
            return { 'emailDomain': true };
          }
        }
        return null;
      };
    }
    
    static telephoneValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const tel = control.value;
        if (tel && tel.length !== 10) {
          return { telephone: true };
        }
        return null;
      };
    }
}