import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componentes importados
import { NavBar } from './nav-bar/nav-bar';
import { NavItem } from './nav-bar/nav-item/nav-item';
import { MinecraftCardComponent } from './information-block/information-block';
import { CardListComponent } from './card-list/card-list';
import { InformationAccordionComponent } from './information-accordion/information-accordion';
import { ProyectosComponent } from './proyectos/proyectos';

// Interfaz para las tarjetas
interface CardData {
  id: string;
  src: string;
  alt: string;
  iconClass: string;
  searchableText: string;
  items: { title: string; description: string }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    NavBar,
    NavItem,
    MinecraftCardComponent,
    CardListComponent,
    InformationAccordionComponent,
    ProyectosComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cv-angular';

  // Propiedades de Tema
  isLightMode: boolean = false;
  themeIconAlt: string = 'Switch to light mode';

  // Propiedades de Saludo
  greetingMessage: string = 'Loading greeting...!';
  private greetingInterval: any;

  // Propiedades de Búsqueda y Datos
  searchText: string = '';
  allCards: CardData[] = [];
  filteredCards: CardData[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadTheme();
    this.updateGreeting();
    this.greetingInterval = setInterval(() => this.updateGreeting(), 60000);
    this.allCards = this.getInitialCardData();
    this.filteredCards = this.allCards;
  }

  ngOnDestroy(): void {
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval);
    }
  }

  // -----------------------------------------------------------------------
  // Lógica de Filtrado y Datos
  // -----------------------------------------------------------------------

  filterCards(): void {
    const term = this.searchText.toLowerCase().trim();

    if (!term) {
      this.filteredCards = this.allCards;
      return;
    }

    this.filteredCards = this.allCards.filter((card) => {
      return card.searchableText.toLowerCase().includes(term);
    });
  }

  private getInitialCardData(): CardData[] {
    return [
      {
        id: 'python-backend',
        src: '/icons/command_block.png',
        alt: 'Command Block',
        iconClass: 'minecraft-icon',
        searchableText:
          'Python Desarrollo backend y análisis de datos Data Science',
        items: [
          { title: 'Python', description: 'Desarrollo backend y análisis de datos' },
        ],
      },
      {
        id: 'git-version',
        src: '/icons/redstone.png',
        alt: 'Redstone Dust',
        iconClass: 'minecraft-icon',
        searchableText: 'Git GitHub Control de versiones y colaboración',
        items: [
          { title: 'Git/GitHub', description: 'Control de versiones y colaboración' },
        ],
      },
    ];
  }

  // -----------------------------------------------------------------------
  // Lógica de Tema
  // -----------------------------------------------------------------------

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
      this.isLightMode = true;
    } else if (savedTheme === 'dark' || prefersDark) {
      this.isLightMode = false;
    } else {
      this.isLightMode = false;
    }

    this.applyTheme(this.isLightMode);
  }

  applyTheme(isLight: boolean): void {
    if (isLight) {
      this.renderer.addClass(document.body, 'light-mode');
      this.themeIconAlt = 'Switch to dark mode';
    } else {
      this.renderer.removeClass(document.body, 'light-mode');
      this.themeIconAlt = 'Switch to light mode';
    }
    this.isLightMode = isLight;
  }

  toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
    this.applyTheme(this.isLightMode);

    const themeToSave = this.isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', themeToSave);
  }

  // -----------------------------------------------------------------------
  // Lógica de Saludo
  // -----------------------------------------------------------------------

  getTimeBasedGreeting(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 6) {
      return 'What are you doing up at this hour??';
    } else if (hour >= 6 && hour < 12) {
      return 'Good morning!';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  }

  updateGreeting(): void {
    this.greetingMessage = this.getTimeBasedGreeting();
  }

  // -----------------------------------------------------------------------
  // Otros Métodos
  // -----------------------------------------------------------------------

  downloadPDF(): void {
    window.print();
  }
}