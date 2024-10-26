import { Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { SignupComponent } from './common/components/signup/signup.component';
import { ArrendadorInicioComponent } from './arrendador/components/arrendador-inicio/arrendador-inicio.component';
import { ArrendadorPerfilComponent } from './arrendador/components/arrendador-perfil/arrendador-perfil.component';
import { simpleAuthGuard } from './common/guards/simple-auth.guard';

import { PropiedadFormComponent } from './arrendador/components/propiedad-form/propiedad-form.component';
import { ArrendadorPropiedadesComponent } from './arrendador/components/arrendador-propiedades/arrendador-propiedades.component';
import { ArrendadorPropiedadDetallesComponent } from './arrendador/components/arrendador-propiedad-detalles/arrendador-propiedad-detalles.component';
import { ArrendatarioInicioComponent } from './arrendatario/components/arrendatario-inicio/arrendatario-inicio.component';
import { ArrendatarioPerfilComponent } from './arrendatario/components/arrendatario-perfil/arrendatario-perfil.component';
import { ArrendatarioBuscarPropiedadesComponent } from './arrendatario/components/arrendatario-buscar-propiedades/arrendatario-buscar-propiedades.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path:'arrendador', component: ArrendadorInicioComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/perfil', component: ArrendadorPerfilComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades', component: ArrendadorPropiedadesComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades/crear-propiedad', component: PropiedadFormComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades/:id', component: ArrendadorPropiedadDetallesComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades/editar/:id', component: PropiedadFormComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario', component: ArrendatarioInicioComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/perfil', component: ArrendatarioPerfilComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/propiedades', component: ArrendatarioBuscarPropiedadesComponent, canActivate: [simpleAuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
