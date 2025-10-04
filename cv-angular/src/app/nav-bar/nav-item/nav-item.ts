import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  template: `
    <a class="item" 
       [href]="isExternalLink ? href : 'javascript:void(0)'" 
       (click)="handleClick($event)"
       [target]="isExternalLink ? '_blank' : '_self'">
      <img [src]="iconSrc" [alt]="altText" class="minecraft-icon">
      {{ text }}
    </a>
  `,
  styleUrls: ['../nav-bar.css'] 
})
export class NavItem {
  @Input() href: string = '#';
  @Input() iconSrc: string = '';
  @Input() text: string = '';
  @Input() altText: string = 'Icono de navegación';
  @Output() navClick = new EventEmitter<string>();

  get isExternalLink(): boolean {
    return this.href.startsWith('http') || this.href.startsWith('mailto:');
  }

  handleClick(event: Event): void {
    if (!this.isExternalLink && this.href.startsWith('#')) {
      event.preventDefault();
      const sectionId = this.href.substring(1); // Elimina el '#'
      this.navClick.emit(sectionId);
    }
  }
}