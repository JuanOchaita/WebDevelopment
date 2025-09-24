import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SectionComponent } from './components/section/section.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SectionComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  greeting = '¡Cargando saludo...!';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.loadTheme();
    this.updateGreeting();
    setInterval(() => this.updateGreeting(), 60000);
  }

  toggleTheme() {
    const body = this.document.body;
    if (body.classList.contains('light-mode')) {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  loadTheme() {
    const body = this.document.body;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
      body.classList.add('light-mode');
    } else if (savedTheme === 'dark' || prefersDark) {
      body.classList.remove('light-mode');
    } else {
      body.classList.remove('light-mode');
    }
  }

  getTimeBasedGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    let greeting;
    
    if (hour >= 0 && hour < 6) {
        greeting = "¿Qué haces despierto a estas horas??";
    } else if (hour >= 6 && hour < 12) {
        greeting = "¡Buenos días!";
    } else if (hour >= 12 && hour < 18) {
        greeting = "¡Buenas tardes!";
    } else {
        greeting = "¡Buenas noches!";
    }
    
    return greeting;
  }

  updateGreeting() {
    this.greeting = this.getTimeBasedGreeting();
  }

  downloadPDF() {
    const printWindow = window.open('', '_blank');
    const htmlContent = this.document.documentElement.outerHTML;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    printWindow.onload = () => {
        printWindow.print();
    };
  }
}
