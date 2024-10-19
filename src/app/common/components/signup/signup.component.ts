import { Component } from '@angular/core';
import { CuentaDTO } from '../../models/CuentaDTO';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrendatarioService } from '../../services/arrendatario.service';
import { ArrendadorService } from '../../services/arrendador.service';
import { CommonModule } from '@angular/common';
import { FormFieldErrorDirective } from '../../directives/form-field-error.directive';
import { CustomValidators } from '../../validators/custom-validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldErrorDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private arrendatarioService: ArrendatarioService, 
    private arrendadorService: ArrendadorService,
    private authService : AuthService,
    private router: Router
  ) {
    this.signupForm = this.initForm(fb);
  }

  initForm(fb: FormBuilder) {
    return fb.group({
      name: ['', { 
        validators: Validators.required
      }],
      surname: ['', { 
        validators: Validators.required
      }],
      email: ['', { 
        validators: [Validators.required, Validators.email]
      }],
      tel: ['', { 
        validators: [Validators.required, CustomValidators.telephoneValidator()]
      }],
      password: ['', { 
        validators: [Validators.required, Validators.minLength(8)], 
        updateOn: 'change'
      }],
      confirmPassword: ['', { 
        validators: [Validators.required, Validators.minLength(8)], 
        updateOn: '' 
      }],
      userType: ['arrendatario', {
        validator: [Validators.required],
        updateOn: 'change'
      }], 
    }, { validators: CustomValidators.passwordMatchValidator(),
      updateOn: 'blur'
     });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.signupForm.valid) {
      // Handle form submission
      console.log('Form Submitted', this.signupForm.value);
      this.registerUser();
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  async registerUser() {

    try {
      const newUser: CuentaDTO = {
        idCuenta: 0,
        nombreCuenta: this.signupForm.value.name,
        //surname: this.signupForm.value.surname,
        email: this.signupForm.value.email,
        //tel: this.signupForm.value.tel,
      };
      console.log(newUser);
      this.registerUserByUserType(newUser);
    } catch (error) {
      alert('Error al registrar el usuario');
      //console.error(error);
    }
  }

  private async registerUserByUserType(newUser: CuentaDTO) {
    let registroExitoso = false;
    const userType = this.signupForm.get('userType')!.value;
    if (userType === 'arrendatario') {
      await this.arrendatarioService.saveNewArrendatario(newUser, this.signupForm.value.password).then(() => {
        alert('Arrendatario registrado exitosamente');
        registroExitoso = true;
      }).catch(error => {
        alert(error.message);
      });

    } else {
      await this.arrendadorService.saveNewArrendador(newUser, this.signupForm.value.password).then(() => {
        alert('Arrendador registrado exitosamente');
        registroExitoso = true;
      }).catch(error => {
        alert(error.message);
      });
    }

    if (registroExitoso) {
      await this.authService.login(this.signupForm.value.email, this.signupForm.value.password);
      let path = '/arrendador';
      if (this.signupForm.value.userType === 'arrendatario') {
        path = '/arrendatario';
      }
      this.router.navigate([path]);
    }
  }
}
