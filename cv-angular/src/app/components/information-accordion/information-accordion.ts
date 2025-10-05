import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-information-accordion',
  templateUrl: './information-accordion.html',
  styleUrls: ['./information-accordion.css']
})
export class InformationAccordionComponent implements OnInit {

  @Input() title: string = '';
  @Input() iconPath: string = ""; 

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes añadir lógica de inicialización si fuera necesaria
  }

}