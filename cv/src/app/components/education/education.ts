import { Component } from '@angular/core';
import { Education } from '../../models/cv-data.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.html',
  styleUrls: ['./education.scss']
})
export class EducationComponent {
  educationData: Education[] = [
    {
      year: '2020-2024',
      institution: 'Universidad Francisco Marroquín',
      degree: 'Ingeniería en Ciencias de la Computación'
    },
    {
      year: '2018-2020',
      institution: 'Colegio Internacional de Guatemala',
      degree: 'Bachillerato en Ciencias y Letras'
    }
  ];
}