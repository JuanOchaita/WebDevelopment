import { Component } from '@angular/core';
import { Experience } from '../../models/cv-data.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss']
})
export class ExperienceComponent {
  mainAccordionOpen = true;
  
  experienceData: Experience[] = [
    {
      id: 'current',
      period: 'Enero 2023 - Presente',
      company: 'TechSolutions Guatemala',
      position: 'Desarrollador Junior',
      responsibilities: [
        'Desarrollo de aplicaciones web usando JavaScript y Python',
        'Colaboración en proyectos de equipo usando metodologías ágiles',
        'Mantenimiento y optimización de bases de datos',
        'Testing y debugging de aplicaciones'
      ],
      expanded: true
    },
    {
      id: 'previous',
      period: 'Junio 2022 - Diciembre 2022',
      company: 'TechProblems S.A.',
      position: 'Asistente de Laboratorio de Computación',
      responsibilities: [
        'Soporte técnico a estudiantes en laboratorios de computación',
        'Instalación y configuración de software educativo',
        'Mantenimiento preventivo de equipos de cómputo',
        'Documentación de problemas técnicos y sus soluciones'
      ],
      expanded: false
    }
  ];

  toggleMainAccordion() {
    this.mainAccordionOpen = !this.mainAccordionOpen;
  }

  toggleExperience(id: string) {
    const experience = this.experienceData.find(exp => exp.id === id);
    if (experience) {
      experience.expanded = !experience.expanded;
    }
  }
}