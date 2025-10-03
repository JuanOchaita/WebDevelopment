import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NECESARIO PARA [(ngModel)]
import { NavBar } from './nav-bar/nav-bar';
import { NavItem } from './nav-bar/nav-item/nav-item';
import { MinecraftCardComponent } from './information-block/information-block';
import { CardListComponent } from './card-list/card-list';

// 1. Definición de la estructura de datos para una tarjeta
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
  // 2. Agregar FormsModule a los imports
  imports: [NavBar, NavItem, MinecraftCardComponent, CardListComponent, FormsModule], 
  templateUrl: './app.html',
})

export class App implements OnInit {
  title = 'Mi CV Angular';
  
  isLightMode: boolean = false;
  themeIconAlt: string = 'Switch to light mode';
  greetingMessage: string = 'Loading greeting...!';

  // --- Propiedades de Búsqueda y Datos ---
  searchText: string = ''; 
  allCards: CardData[] = []; 
  filteredCards: CardData[] = []; 
  // ---------------------------------------

  constructor(private renderer: Renderer2) { } 

  ngOnInit(): void {
    this.loadTheme();
    this.setGreetingMessage();
    
    // Inicializar los datos de las tarjetas y los resultados filtrados
    this.allCards = this.getInitialCardData();
    this.filteredCards = this.allCards;
  }

  // 3. Método para la lógica de filtrado
  filterCards(): void {
    const term = this.searchText.toLowerCase().trim();

    if (!term) {
      // Si no hay texto, mostrar todas las tarjetas
      this.filteredCards = this.allCards;
      return;
    }

    // Filtrar la lista maestra por el texto de búsqueda
    this.filteredCards = this.allCards.filter(card => {
      return card.searchableText.toLowerCase().includes(term);
    });
  }

  // Función para simular/cargar los datos iniciales de las tarjetas
  private getInitialCardData(): CardData[] {
    return [
      {
        id: 'python-backend',
        src: '/icons/command_block.png',
        alt: 'Command Block',
        iconClass: 'minecraft-icon',
        searchableText: 'Python Desarrollo backend y análisis de datos Data Science',
        items: [
          { title: 'Python', description: 'Desarrollo backend y análisis de datos' }
        ]
      },
      {
        id: 'git-version',
        src: '/icons/redstone.png',
        alt: 'Redstone Dust',
        iconClass: 'minecraft-icon',
        searchableText: 'Git GitHub Control de versiones y colaboración',
        items: [
          { title: 'Git/GitHub', description: 'Control de versiones y colaboración' }
        ]
      },
      // Puedes agregar más tarjetas aquí, asegurándote de actualizar 'searchableText'
    ];
  }
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
  
  getTimeBasedGreeting(): string {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 0 && hour < 6) {
      return "What are you doing up at this hour??";
    } else if (hour >= 6 && hour < 12) {
      return "Good morning!";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  }

  setGreetingMessage(): void {
    this.greetingMessage = this.getTimeBasedGreeting();
  }
}
