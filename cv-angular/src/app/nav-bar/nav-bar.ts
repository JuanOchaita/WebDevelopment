// src/app/nav-bar/nav-bar.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario si usas directivas como *ngIf o *ngFor

@Component({
  // Selector usado en app.html para mostrar este componente
  selector: 'app-nav-bar', 
  // Rutas a la plantilla y estilos (sin el sufijo .component)
  templateUrl: './nav-bar.html', 
  styleUrls: ['./nav-bar.css'],   
  // Importante: Marcamos el componente como autónomo
  standalone: true, 
  // Importamos módulos necesarios (CommonModule es útil si lo necesitarás más tarde)
  imports: [CommonModule]
})
export class NavBar {
  // En este caso, no se necesita lógica JavaScript/TypeScript para una simple barra de navegación.
  // La clase se deja vacía.
}