import { Component } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar'; // Importa la barra
import { NavItem } from './nav-bar/nav-item/nav-item'; // ¡Importa el auxiliar!

@Component({
  selector: 'app-root',
  standalone: true,
  // Ambas etiquetas deben estar en el array de imports
  imports: [NavBar, NavItem], 
  templateUrl: './app.html',
})
export class App {
  title = 'Mi CV Angular';
}