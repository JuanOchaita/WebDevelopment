import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Input() greeting: string = '¡Cargando saludo...!';
  @Output() themeToggle = new EventEmitter<void>();

  onThemeToggle() {
    this.themeToggle.emit();
  }
}