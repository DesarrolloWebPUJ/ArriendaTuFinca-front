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
import { SolicitudFormComponent } from './arrendatario/components/solicitud-form/solicitud-form.component';
import { ArrendatarioSolicitudDetailsComponent } from './arrendatario/components/arrendatario-solicitud-details/arrendatario-solicitud-details.component';
import { SolicitudCreateComponent } from './arrendatario/components/solicitud-create/solicitud-create.component';
import { SolicitudDetailsComponent } from './common/components/solicitud-details/solicitud-details.component';
import { SolicitudesListComponent } from './arrendador/components/solicitudes-list/solicitudes-list.component';
import { CalificarComponent } from './arrendador/components/calificacion/calificar/calificacion.component';
import { CalificacionesPendientesComponent } from './arrendador/components/calificacion/calificaciones-pendientes.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { hideNavbar: true }},
    { path: 'signup', component: SignupComponent,data: { hideNavbar: true }},
    { path: 'arrendador', component: ArrendadorInicioComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/perfil', component: ArrendadorPerfilComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/solicitudes', component: SolicitudesListComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades', component: ArrendadorPropiedadesComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades/crear-propiedad', component: PropiedadFormComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades/:id', component: ArrendadorPropiedadDetallesComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/propiedades/editar/:id', component: PropiedadFormComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario', component: ArrendatarioInicioComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/perfil', component: ArrendatarioPerfilComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/propiedades/crear-solicitud/:id', component: SolicitudCreateComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/propiedades', component: ArrendatarioBuscarPropiedadesComponent, canActivate: [simpleAuthGuard]},
    { path: 'solicitud/:id', component: SolicitudDetailsComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/solicitud/:id', component: ArrendatarioSolicitudDetailsComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendatario/solicitar/propiedad/:id', component: SolicitudFormComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/solicitud/:id', component: SolicitudDetailsComponent, canActivate: [simpleAuthGuard]},
    { path: 'arrendador/calificaciones-pendientes', component: CalificacionesPendientesComponent },
    { path: 'arrendador/:id/calificaciones', component: CalificarComponent },
    { path: '**', redirectTo: 'calificaciones-pendientes' },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
