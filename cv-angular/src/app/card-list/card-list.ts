import { Component, Input } from '@angular/core';

@Component({
  // *** El selector cambia a 'app-card-list' ***
  selector: 'app-card-list', 
  templateUrl: './card-list.html',
  styleUrls: ['./card-list.css']
})
export class CardListComponent {
  // --- Inputs del componente ---
  
  /** * La ruta de la imagen que se mostrará en el encabezado. 
   * Ejemplo: 'icons/command_block.png'
   */
  @Input() src: string = '';

  /** * El texto alternativo (alt) para la imagen. 
   * Ejemplo: 'Command Block'
   */
  @Input() alt: string = '';

  /** * La clase CSS para aplicar a la etiqueta <img>. 
   * Ejemplo: 'minecraft-icon'
   */
  @Input() iconClass: string = '';
}