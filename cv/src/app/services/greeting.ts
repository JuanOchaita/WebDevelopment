import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  private greetingSubject = new BehaviorSubject<string>('¡Cargando saludo...!');
  public greeting$ = this.greetingSubject.asObservable();
  private intervalSubscription: Subscription | null = null;

  constructor() {
    this.updateGreeting();
  }

  startGreetingUpdates(): void {
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.updateGreeting();
    });
  }

  stopGreetingUpdates(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  private updateGreeting(): void {
    const now = new Date();
    const hour = now.getHours();
    let greeting: string;
    
    if (hour >= 0 && hour < 6) {
      greeting = "¿Qué haces despierto a estas horas??";
    } else if (hour >= 6 && hour < 12) {
      greeting = "¡Buenos días!";
    } else if (hour >= 12 && hour < 18) {
      greeting = "¡Buenas tardes!";
    } else {
      greeting = "¡Buenas noches!";
    }
    
    this.greetingSubject.next(greeting);
  }
}