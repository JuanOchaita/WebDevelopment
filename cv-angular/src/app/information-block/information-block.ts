import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minecraft-card', // Selector para usarlo en el HTML
  templateUrl: './information-block.html',
  styleUrls: ['./information-block.css']
})
export class MinecraftCardComponent {
  // Propiedades de entrada para la cabecera
  @Input() cardId: string = '';
  @Input() iconSrc: string = '';
  @Input() iconAlt: string = '';
  @Input() title: string = '';
}