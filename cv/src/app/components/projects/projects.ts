import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  private subscription = new Subscription();
  
  technicalSkills = [
    { name: 'Python', description: 'Desarrollo backend y análisis de datos', visible: true },
    { name: 'Gestión de proyectos', description: 'Metodologías ágiles y tradicionales', visible: true },
    { name: 'Resolución de problemas', description: 'Pensamiento analítico y lógico', visible: true },
    { name: 'JavaScript', description: 'Desarrollo frontend y Node.js', visible: true },
    { name: 'Git/GitHub', description: 'Control de versiones y colaboración', visible: true }
  ];

  hobbies = [
    { name: 'Películas', description: 'Especialmente ciencia ficción y tecnología', visible: true },
    { name: 'Videojuegos', description: 'Desarrollo indie y gaming competitivo', visible: true },
    { name: 'Cocina', description: 'Experimentación con recetas internacionales', visible: true },
    { name: 'Tecnología', description: 'Últimas tendencias en desarrollo de software', visible: true }
  ];

  processes = [
    {
      title: 'Análisis de proyecto',
      details: ['Definición de requerimientos', 'Identificación de stakeholders'],
      visible: true
    },
    {
      title: 'Investigación',
      details: ['Investigación teórica', 'Evaluación de herramientas disponibles', 'Análisis de tecnologías emergentes'],
      visible: true
    },
    {
      title: 'Distribución y ejecución de proyecto',
      details: ['Planificación de sprints', 'Desarrollo iterativo', 'Testing y deployment'],
      visible: true
    }
  ];

  get filteredTechnicalSkills() { return this.technicalSkills; }
  get filteredHobbies() { return this.hobbies; }
  get filteredProcesses() { return this.processes; }

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.subscription.add(
      this.searchService.searchTerm$.subscribe(term => {
        this.searchTerm = term;
        this.filterContent(term);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchService.updateSearchTerm(target.value);
  }

  private filterContent(searchTerm: string) {
    if (!searchTerm) {
      this.showAllItems();
      return;
    }

    this.technicalSkills.forEach(skill => {
      skill.visible = skill.name.toLowerCase().includes(searchTerm) || 
                     skill.description.toLowerCase().includes(searchTerm);
    });

    this.hobbies.forEach(hobby => {
      hobby.visible = hobby.name.toLowerCase().includes(searchTerm) || 
                      hobby.description.toLowerCase().includes(searchTerm);
    });

    this.processes.forEach(process => {
      const titleMatch = process.title.toLowerCase().includes(searchTerm);
      const detailMatch = process.details.some(detail => 
        detail.toLowerCase().includes(searchTerm)
      );
      process.visible = titleMatch || detailMatch;
    });
  }

  private showAllItems() {
    this.technicalSkills.forEach(skill => skill.visible = true);
    this.hobbies.forEach(hobby => hobby.visible = true);
    this.processes.forEach(process => process.visible = true);
  }

  shouldShowCard(type: string): boolean {
    switch (type) {
      case 'technical':
        return this.technicalSkills.some(skill => skill.visible);
      case 'hobbies':
        return this.hobbies.some(hobby => hobby.visible);
      case 'process':
        return this.processes.some(process => process.visible);
      default:
        return true;
    }
  }

  getCardDisplay(type: string): string {
    return this.shouldShowCard(type) ? 'block' : 'none';
  }
}