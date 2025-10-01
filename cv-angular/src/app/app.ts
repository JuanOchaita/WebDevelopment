// src/app/app.ts

import { Component } from '@angular/core';
// Importa tu nuevo componente desde su ubicación relativa
import { NavBar } from './nav-bar/nav-bar'; // <--- ¡AÑADE ESTA LÍNEA!

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  // Si tu componente principal NO es standalone, debes declararlo en 'declarations'
  // Si tu componente principal SÍ es standalone (lo más probable en proyectos nuevos),
  // debes importarlo en 'imports'.

  // Asumiendo que 'App' es un componente standalone (la configuración moderna por defecto):
  standalone: true, // Si esta línea existe
  imports: [
    // ... otros imports que ya tengas (como RouterOutlet)
    NavBar // <--- ¡AÑADE ESTA REFERENCIA AQUÍ!
  ]
})
export class App {
  title = () => 'Angular'; // O el título que ya tenías
  // ... resto de la clase
}