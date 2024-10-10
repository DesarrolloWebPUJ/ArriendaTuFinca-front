import { Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { SignupComponent } from './common/components/signup/signup.component';
import { ArrendadorInicioComponent } from './arrendador/components/arrendador-inicio/arrendador-inicio.component';
import { ArrendadorPerfilComponent } from './arrendador/components/arrendador-perfil/arrendador-perfil.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path:'arrendador/:idUsuario', component: ArrendadorInicioComponent},
    {path: 'arrendador/perfil/:idUsuario', component: ArrendadorPerfilComponent}
];
