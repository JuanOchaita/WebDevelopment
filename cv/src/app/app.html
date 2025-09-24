import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { GreetingService } from './services/greeting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'juan-ochaita-cv';
  greeting$ = this.greetingService.greeting$;
  isDarkMode$ = this.themeService.isDarkMode$;
  private subscriptions = new Subscription();

  constructor(
    private themeService: ThemeService,
    private greetingService: GreetingService
  ) {}

  ngOnInit() {
    this.themeService.loadTheme();
    this.greetingService.startGreetingUpdates();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.greetingService.stopGreetingUpdates();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  downloadPDF() {
    window.print();
  }
}