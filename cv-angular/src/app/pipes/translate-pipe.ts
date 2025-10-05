import { Pipe, PipeTransform, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '../services/translate';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private translateService = inject(TranslateService);
  private changeDetector = inject(ChangeDetectorRef);
  private langSubscription: Subscription;

  private value: string = '';
  private lastKey: string = '';
  private lastLang: string = '';

  constructor() {
    this.langSubscription = this.translateService.getCurrentLangObservable().subscribe(() => {
      this.lastKey = '';
      this.changeDetector.markForCheck();
    });
  }

  transform(key: string): string {
    const currentLang = this.translateService.getCurrentLang();

    if (key === this.lastKey && currentLang === this.lastLang) {
      return this.value;
    }

    this.lastKey = key;
    this.lastLang = currentLang;

    if (currentLang === 'es') {
      this.value = key;
      return key;
    }

    this.translateService.getTranslation(key).then(translated => {
      this.value = translated;
      this.changeDetector.markForCheck();
    }).catch(() => {
      this.value = key;
      this.changeDetector.markForCheck();
    });

    return this.value || key;
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}