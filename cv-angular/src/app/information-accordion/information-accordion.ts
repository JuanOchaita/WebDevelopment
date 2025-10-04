import { Component, OnInit } from '@angular/core';

@Component({
  // Selector que usarás en tu HTML: <app-information-accordion>
  selector: 'app-information-accordion',
  templateUrl: './information-accordion.html',
  // Los estilos específicos del acordeón irán aquí
  styleUrls: ['./information-accordion.css']
})
export class InformationAccordionComponent implements OnInit {

  // Propiedad para el texto del título (puede ser un @Input() si quieres que sea dinámico)
  title: string = 'Contacto';
  // Propiedad para la ruta de la imagen del icono
  iconPath: string = './icons/map.png'; 

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes añadir lógica de inicialización si fuera necesaria
  }

}