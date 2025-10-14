import { Component, OnInit, OnDestroy, Renderer2, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

// Componentes importados
import { NavBar } from './nav-bar/nav-bar';
import { NavItem } from './nav-bar/nav-item/nav-item';
import { MinecraftCardComponent } from './components/information-block/information-block';
import { InformationAccordionComponent } from './components/information-accordion/information-accordion';
import { EducationComponent } from './components/education/education'; // ← SOLO ESTA LÍNEA AGREGADA

// Componentes de traducción
import { LanguageSelectorComponent } from './components/language-selector/language-selector';
import { TranslatePipe } from './pipes/translate-pipe';
import { TranslateService } from './services/translate';

// Servicio de datos 
import { DataService } from './services/data-service';

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
    RouterModule,
    NavBar,
    NavItem,
    MinecraftCardComponent,
    InformationAccordionComponent,
    LanguageSelectorComponent,
    EducationComponent, // ← SOLO ESTA LÍNEA AGREGADA
    TranslatePipe
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cv-angular';

  // Inyectar servicios
  private translateService = inject(TranslateService);
  private dataService = inject(DataService);

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

  // Propiedad para el idioma actual
  currentLang: string = 'es';

  // Propiedades para los datos del servicio
  skills: string[] = [];
  jobs: string[] = [];

  constructor(
    private renderer: Renderer2,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTheme();
    this.updateGreeting();
    this.greetingInterval = setInterval(() => this.updateGreeting(), 60000);
    this.allCards = this.getInitialCardData();
    this.filteredCards = this.allCards;
    
    // Cargar datos del servicio
    this.loadServiceData();
    
    // Suscribirse a cambios de idioma
    this.translateService.getCurrentLangObservable().subscribe(lang => {
      this.currentLang = lang;
      // Actualizar el saludo cuando cambie el idioma
      this.updateGreeting();
    });

    // Escuchar cambios de ruta para hacer scroll a los fragments
    this.setupRouteFragmentScrolling();
  }

  // Configurar scroll automático para fragments de rutas - CORREGIDO
  setupRouteFragmentScrolling(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Mapeo de rutas a fragments
        const routeToFragmentMap: { [key: string]: string } = {
          'about': 'about-section',
          'skills': 'skills-section',
          'jobs': 'jobs-subsection',
          'studies': 'studies-subsection'
        };

        // Obtener los segmentos de la URL
        const urlSegments = event.urlAfterRedirects.split('/');
        
        // Buscar el último segmento que esté en nuestro mapeo
        for (let i = urlSegments.length - 1; i >= 0; i--) {
          const segment = urlSegments[i];
          if (routeToFragmentMap[segment]) {
            const fragment = routeToFragmentMap[segment];
            setTimeout(() => {
              this.scrollToSection(fragment);
            }, 500); // Aumentar el delay para asegurar que el DOM esté listo
            break;
          }
        }
      });
  }

  // Método para cargar datos del servicio
  loadServiceData(): void {
    this.skills = this.dataService.getSkills();
    this.jobs = this.dataService.getJobs();
  }

  ngOnDestroy(): void {
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval);
    }
  }

  // -----------------------------------------------------------------------
  // Navegación con Scroll
  // -----------------------------------------------------------------------

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // También actualizar la URL con el fragmento
      this.viewportScroller.scrollToAnchor(sectionId);
    } else {
      console.warn(`Element with id '${sectionId}' not found`);
    }
  }

  // -----------------------------------------------------------------------
  // Navegación a Rutas
  // -----------------------------------------------------------------------

  navigateToAbout(href: string): void {
    this.router.navigate(['/proyectos', 'about']).then(() => {
      // Scroll manual después de la navegación
      setTimeout(() => {
        this.scrollToSection('about-section');
      }, 100);
    });
  }

  navigateToSkills(href: string): void {
    this.router.navigate(['/proyectos', 'skills']).then(() => {
      setTimeout(() => {
        this.scrollToSection('skills-section');
      }, 100);
    });
  }

  navigateToExperience(href: string): void {
    this.router.navigate(['/proyectos', 'experience', 'jobs']).then(() => {
      setTimeout(() => {
        this.scrollToSection('jobs-subsection');
      }, 100);
    });
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
        searchableText: 'Python Desarrollo backend y análisis de datos Data Science',
        items: [
          { 
            title: 'Python', 
            description: 'Desarrollo backend y análisis de datos' 
          },
        ],
      },
      {
        id: 'git-version',
        src: '/icons/redstone.png',
        alt: 'Redstone Dust',
        iconClass: 'minecraft-icon',
        searchableText: 'Git GitHub Control de versiones y colaboración',
        items: [
          { 
            title: 'Git/GitHub', 
            description: 'Control de versiones y colaboración' 
          },
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
  // Lógica de Saludo (Actualizada para soportar traducción)
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
    const greeting = this.getTimeBasedGreeting();
    
    // Si el idioma actual no es inglés, traducir el saludo
    if (this.currentLang !== 'en') {
      this.translateService.getTranslation(greeting).then(translated => {
        this.greetingMessage = translated;
      }).catch(() => {
        this.greetingMessage = greeting;
      });
    } else {
      this.greetingMessage = greeting;
    }
  }

  // -----------------------------------------------------------------------
  // Otros Métodos
  // -----------------------------------------------------------------------

  downloadPDF(): void {
    window.print();
  }
}