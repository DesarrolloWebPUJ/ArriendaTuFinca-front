import { Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { SignupComponent } from './common/components/signup/signup.component';
import { ArrendadorInicioComponent } from './arrendador/components/arrendador-inicio/arrendador-inicio.component';
import { ArrendadorPerfilComponent } from './arrendador/components/arrendador-perfil/arrendador-perfil.component';
import { simpleAuthGuard } from './common/guards/simple-auth.guard';
import { PropiedadesListComponent } from './propiedades/components/propiedades-lista/propiedades-lista.component';
import { PropiedadesFormComponent } from './propiedades/components/propiedades-form/propiedades-form.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path:'arrendador', component: ArrendadorInicioComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/perfil', component: ArrendadorPerfilComponent, canActivate: [simpleAuthGuard]},
    { path: 'propiedades', component: PropiedadesListComponent },
    { path: 'propiedades/crear', component: PropiedadesFormComponent },
    { path: 'propiedades/editar/:id', component: PropiedadesFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
