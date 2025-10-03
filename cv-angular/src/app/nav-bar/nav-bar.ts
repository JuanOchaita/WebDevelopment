import { Component } from '@angular/core';
import { NavItem } from './nav-item/nav-item'; // Importa el componente auxiliar

@Component({
  selector: 'app-nav-bar', 
  standalone: true,
  // Importa NavItem para que se pueda usar dentro del contenido proyectado
  imports: [], 
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css'],
})
export class NavBar {
  // No necesita lógica, solo actúa como contenedor
}