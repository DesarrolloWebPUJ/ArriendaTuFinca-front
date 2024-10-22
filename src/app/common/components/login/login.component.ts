import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFieldErrorDirective } from '../../directives/form-field-error.directive';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../models/enums/UserRole';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldErrorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private router : Router,
    private authService: AuthService
  ) {
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
    await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    if(this.authService.isAuthenticated()){
      console.log('Login successful');
      this.acces();
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

  private acces(){
    const rol = this.authService.getUserRole();
    if (rol === UserRole.Arrendador) {
      this.router.navigate(['/arrendador']);
    } else{
      this.router.navigate(['/arrendatario']);
    }
  }
  
}