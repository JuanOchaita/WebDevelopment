import { Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/proyectos', 
    pathMatch: 'full' 
  },
  { 
    path: 'proyectos', 
    component: ProyectosComponent 
  },
  {
    path: '**',
    redirectTo: '/proyectos'
  }
];