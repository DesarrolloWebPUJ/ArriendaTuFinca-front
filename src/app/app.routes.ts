import { Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { SignupComponent } from './common/components/signup/signup.component';
import { ArrendadorInicioComponent } from './arrendador/components/arrendador-inicio/arrendador-inicio.component';
import { ArrendadorPerfilComponent } from './arrendador/components/arrendador-perfil/arrendador-perfil.component';
import { simpleAuthGuard } from './common/guards/simple-auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path:'arrendador', component: ArrendadorInicioComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/perfil', component: ArrendadorPerfilComponent, canActivate: [simpleAuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
