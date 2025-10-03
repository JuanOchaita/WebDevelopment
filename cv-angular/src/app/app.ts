import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { CommonModule } from '@angular/common'; // Necesario para directivas comunes (if, for)

// Componentes y módulos importados de ambos códigos
import { NavBar } from './nav-bar/nav-bar';
import { NavItem } from './nav-bar/nav-item/nav-item';
import { MinecraftCardComponent } from './information-block/information-block';
import { CardListComponent } from './card-list/card-list';
import { InformationAccordionComponent } from './information-accordion/information-accordion';

// 1. Definición de la estructura de datos para una tarjeta (De CODE 1)
interface CardData {
  id: string;
  src: string;
  alt: string;
  iconClass: string;
  // Texto clave para la búsqueda (Título + Descripciones)
  searchableText: string;
  items: { title: string; description: string }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  // Combinación de todos los imports necesarios
  imports: [
    CommonModule,
    FormsModule,
    NavBar,
    NavItem,
    MinecraftCardComponent,
    CardListComponent,
    InformationAccordionComponent,
  ],
  templateUrl: './app.html',
  // Se asume que el archivo de estilos (app.css) debe mantenerse
  styleUrls: ['./app.css'],
})

export class App implements OnInit, OnDestroy {
  title = 'Mi CV Angular';

  // --- Propiedades de Tema (Combinadas y adaptadas de CODE 1) ---
  isLightMode: boolean = false;
  themeIconAlt: string = 'Switch to light mode';

  // --- Propiedades de Saludo (Combinadas de ambos códigos) ---
  greetingMessage: string = 'Loading greeting...!';
  private greetingInterval: any;

  // --- Propiedades de Búsqueda y Datos (De CODE 1) ---
  searchText: string = '';
  allCards: CardData[] = [];
  filteredCards: CardData[] = [];
  // -----------------------------------------------------------------------

  // Constructor inyectando Renderer2 (De CODE 1)
  constructor(private renderer: Renderer2) {}

  // Métodos de ciclo de vida
  ngOnInit(): void {
    this.loadTheme();
    // Uso de updateGreeting y setInterval de CODE 2
    this.updateGreeting();
    // Actualizar el saludo cada minuto (60000 ms)
    this.greetingInterval = setInterval(() => this.updateGreeting(), 60000);

    // Inicializar los datos de las tarjetas (De CODE 1)
    this.allCards = this.getInitialCardData();
    this.filteredCards = this.allCards;
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo al destruir el componente (De CODE 2)
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval);
    }
  }

  // -----------------------------------------------------------------------
  // ## Lógica de Filtrado y Datos (De CODE 1)
  // -----------------------------------------------------------------------

  /**
   * Filtra la lista de tarjetas basándose en el texto de búsqueda.
   */
  filterCards(): void {
    const term = this.searchText.toLowerCase().trim();

    if (!term) {
      // Si no hay texto, mostrar todas las tarjetas
      this.filteredCards = this.allCards;
      return;
    }

    // Filtrar la lista maestra por el texto de búsqueda
    this.filteredCards = this.allCards.filter((card) => {
      return card.searchableText.toLowerCase().includes(term);
    });
  }

  /**
   * Función para simular/cargar los datos iniciales de las tarjetas.
   */
  private getInitialCardData(): CardData[] {
    // Datos de ejemplo de CODE 1
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
      // Puedes agregar más tarjetas aquí...
    ];
  }

  // -----------------------------------------------------------------------
  // ## Lógica de Tema (Basada en CODE 1, más robusta con Renderer2)
  // -----------------------------------------------------------------------

  /**
   * Carga el tema guardado o el preferido por el sistema.
   */
  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Lógica de CODE 1 para determinar si es modo claro o no
    if (savedTheme === 'light') {
      this.isLightMode = true;
    } else if (savedTheme === 'dark' || prefersDark) {
      this.isLightMode = false;
    } else {
      this.isLightMode = false; // Default a oscuro
    }

    this.applyTheme(this.isLightMode);
  }

  /**
   * Aplica la clase 'light-mode' al body y actualiza el estado.
   */
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

  /**
   * Alterna entre modo claro y oscuro y guarda la preferencia.
   */
  toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
    this.applyTheme(this.isLightMode);

    const themeToSave = this.isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', themeToSave);
  }

  // -----------------------------------------------------------------------
  // ## Lógica de Saludo (Combinada de ambos códigos)
  // -----------------------------------------------------------------------

  /**
   * Determina el saludo según la hora del día.
   */
  getTimeBasedGreeting(): string {
    const now = new Date();
    const hour = now.getHours();

    // Se mantiene la lógica más detallada de CODE 1 (con el saludo nocturno/madrugada)
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

  /**
   * Actualiza el mensaje de saludo.
   */
  updateGreeting(): void {
    this.greetingMessage = this.getTimeBasedGreeting();
  }

  // -----------------------------------------------------------------------
  // ## Otros Métodos
  // -----------------------------------------------------------------------

  /**
   * Función placeholder para la impresión PDF (De CODE 2).
   */
  downloadPDF(): void {
    window.print();
  }
}