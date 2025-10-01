import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item', // Etiqueta que usaremos en app.html
  standalone: true,
  // El template contiene el enlace <a> que ya tiene la clase 'item' para el espaciado
  template: `
    <a class="item" [href]="href">
      <img [src]="iconSrc" [alt]="altText" class="minecraft-icon">
      {{ text }}
    </a>
  `,
  // Importa los estilos de la barra de navegación para que se apliquen al enlace <a>
  styleUrls: ['../nav-bar.css'] 
})
export class NavItem {
  // Parámetros de entrada que se configuran en app.html
  @Input() href: string = '#';
  @Input() iconSrc: string = '';
  @Input() text: string = '';
  @Input() altText: string = 'Icono de navegación'; 
}