import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFieldErrorDirective } from '../../directives/form-field-error.directive';
import { UsuarioService } from '../../services/usuario.service';
import { CuentaDTO } from '../../models/CuentaDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldErrorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      // Handle form submission
      console.log('Form Submitted', this.loginForm.value);
      this.checkLogin();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async checkLogin(){
    try{
      const cuenta = await this.usuarioService.login(this.loginForm.value.email, this.loginForm.value.password);
      console.log(cuenta);
      alert('Hola ' + cuenta.nombreCuenta);
    } catch (error) {
      alert('Usuario o contraseña incorrectos');
      //console.error(error);
    }
  }
  
}