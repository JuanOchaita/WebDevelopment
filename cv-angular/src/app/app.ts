import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { NavItem } from './nav-bar/nav-item/nav-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBar, NavItem], 
  templateUrl: './app.html',
})

export class App implements OnInit {
  title = 'Mi CV Angular';
  
  isLightMode: boolean = false;
  themeIconAlt: string = 'Switch to light mode';
  greetingMessage: string = 'Loading greeting...!';

  constructor(private renderer: Renderer2) { } 

  ngOnInit(): void {
    this.loadTheme();
    this.setGreetingMessage();
  }

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