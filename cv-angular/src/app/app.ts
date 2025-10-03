import { Component, OnInit, OnDestroy } from '@angular/core';
// ¡Añadida la importación del componente!
import { InformationAccordionComponent } from './information-accordion/information-accordion'; 
import { CommonModule } from '@angular/common'; // Necesario para directivas comunes (if, for)

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  // ⭐️ CLAVE: Se declara como componente Standalone y se importa el componente hijo.
  standalone: true, 
  imports: [
    CommonModule, 
    InformationAccordionComponent // <-- ¡Aquí está!
  ] 
})
export class App implements OnInit, OnDestroy {
  
  title = 'Componente Acordeón CV';
  greetingMessage: string = '';
  themeIconAlt: string = 'Cambiar a modo claro'; 

  private greetingInterval: any;

  ngOnInit(): void {
    this.loadTheme();
    this.updateGreeting();
    this.greetingInterval = setInterval(() => this.updateGreeting(), 60000);
  }

  ngOnDestroy(): void {
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval);
    }
  }

  /**
   * Alterna entre modo claro y oscuro.
   */
  toggleTheme(): void {
    const isLightMode = document.body.classList.contains('light-mode');
    
    if (isLightMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      this.themeIconAlt = 'Cambiar a modo claro';
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      this.themeIconAlt = 'Cambiar a modo oscuro';
    }
  }

  /**
   * Carga el tema guardado o el preferido por el sistema.
   */
  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      this.themeIconAlt = 'Cambiar a modo oscuro';
    } else if (savedTheme === 'dark' || prefersDark) {
      document.body.classList.remove('light-mode');
      this.themeIconAlt = 'Cambiar a modo claro';
    } else {
      document.body.classList.remove('light-mode');
      this.themeIconAlt = 'Cambiar a modo claro';
    }
  }
  
  /**
   * Determina el saludo según la hora del día.
   */
  getTimeBasedGreeting(): string {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) {
      return "¡Buenos días!";
    } else if (hour >= 12 && hour < 18) {
      return "¡Buenas tardes!";
    } else {
      return "¡Buenas noches!";
    }
  }

  updateGreeting(): void {
    this.greetingMessage = this.getTimeBasedGreeting();
  }
  
  // Función placeholder para la impresión PDF
  downloadPDF(): void {
    window.print();
  }
}