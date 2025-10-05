import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../services/translate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.css']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  private translateService = inject(TranslateService);
  private langSubscription!: Subscription;
  
  currentLang: string = 'es';
  languages: any[] = [];
  isOpen = false;

  ngOnInit(): void {
    this.languages = this.translateService.getSupportedLanguages();
    
    this.langSubscription = this.translateService.getCurrentLangObservable().subscribe(lang => {
      this.currentLang = lang;
    });

    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.isOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  selectLanguage(langCode: string, event: Event): void {
    event.stopPropagation();
    this.translateService.setLanguage(langCode);
    this.isOpen = false;
  }

  getCurrentLanguageName(): string {
    const lang = this.languages.find(l => l.code === this.currentLang);
    return lang ? lang.name : 'Español';
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLang);
    return lang ? lang.flag : '🇪🇸';
  }
}