import { Routes } from '@angular/router';
import { ProyectosComponent } from './components/proyectos/proyectos';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'proyectos', 
    pathMatch: 'full' 
  },
  { 
    path: 'proyectos', 
    component: ProyectosComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: ProyectosComponent,
        data: { fragment: 'about-section' }
      },
      {
        path: 'skills', 
        component: ProyectosComponent,
        data: { fragment: 'skills-section' }
      },
      {
        path: 'experience',
        component: ProyectosComponent,
        data: { fragment: 'experience-section' },
        children: [
          {
            path: '',
            redirectTo: 'jobs',
            pathMatch: 'full'
          },
          {
            path: 'jobs',
            component: ProyectosComponent,
            data: { fragment: 'jobs-subsection' }
          },
          {
            path: 'studies',
            component: ProyectosComponent,
            data: { fragment: 'studies-subsection' }
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'proyectos'
  }
];