import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TranslationResult {
  translated: string;
  detectedSource: string;
  raw: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private http = inject(HttpClient);
  private currentLang = new BehaviorSubject<string>('es');
  private translationsCache = new Map<string, string>();
  
  private supportedLanguages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  constructor() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.supportedLanguages.some(lang => lang.code === savedLang)) {
      this.currentLang.next(savedLang);
    }
  }

  async translateText(text: string, target: string = this.currentLang.value, source: string = 'auto'): Promise<TranslationResult> {
    if (!text.trim()) {
      return { translated: '', detectedSource: source, raw: null };
    }

    const cacheKey = `${source}-${target}-${text}`;
    if (this.translationsCache.has(cacheKey)) {
      return {
        translated: this.translationsCache.get(cacheKey) || '',
        detectedSource: source,
        raw: null
      };
    }

    try {
      const base = 'https://translate.googleapis.com/translate_a/single';
      const params = new URLSearchParams({
        client: 'gtx',
        sl: source,
        tl: target,
        dt: 't',
        q: text
      });
      
      const url = `${base}?${params.toString()}`;
      const response: any = await this.http.get(url).toPromise();
      
      const translated = (response[0] || []).map((p: any) => p[0]).join('');
      const detectedSource = response[2] || source;

      this.translationsCache.set(cacheKey, translated);
      return { translated, detectedSource, raw: response };
    } catch (error) {
      console.error('Error en traducción:', error);
      return { translated: text, detectedSource: source, raw: null };
    }
  }

  async translatePageContent(targetLang: string): Promise<void> {
    const elements = document.querySelectorAll('[data-translate]');
    
    for (const element of Array.from(elements)) {
      const originalText = element.getAttribute('data-original') || element.textContent || '';
      
      if (originalText.trim()) {
        try {
          const result = await this.translateText(originalText, targetLang);
          element.textContent = result.translated;
          
          if (!element.getAttribute('data-original')) {
            element.setAttribute('data-original', originalText);
          }
        } catch (error) {
          console.warn(`No se pudo traducir: "${originalText}"`);
        }
      }
    }
    
    this.currentLang.next(targetLang);
    localStorage.setItem('preferred-language', targetLang);
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: targetLang } 
    }));
  }

  getCurrentLang(): string {
    return this.currentLang.value;
  }

  getCurrentLangObservable(): Observable<string> {
    return this.currentLang.asObservable();
  }

  getSupportedLanguages(): any[] {
    return this.supportedLanguages;
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.some(l => l.code === lang)) {
      this.translatePageContent(lang);
    }
  }

  async getTranslation(text: string, targetLang?: string): Promise<string> {
    const lang = targetLang || this.currentLang.value;
    if (lang === 'es') return text;
    
    try {
      const result = await this.translateText(text, lang);
      return result.translated;
    } catch (error) {
      return text;
    }
  }

  clearCache(): void {
    this.translationsCache.clear();
  }
}