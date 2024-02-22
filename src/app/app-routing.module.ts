import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SolicitanteComponent } from './solicitante/solicitante.component';
import { EstudianteComponent } from './estudiante/estudiante.component';


const apppRoutes: Routes = [
  { path: '', redirectTo: '/solicitante', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path:'solicitante', component: SolicitanteComponent },
  { path: 'estudiante', component: EstudianteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(apppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, SolicitanteComponent, EstudianteComponent]
