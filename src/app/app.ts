import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {PaceConvertor} from "./pace-convertor/pace-convertor";
import {PaceCalculator} from "./pace-calculator/pace-calculator";
import {HrZonesCalculator} from "./hr-zones-calculator/hr-zones-calculator";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    PaceConvertor,
    PaceCalculator,
    HrZonesCalculator,
  ],
  template: `
    <main class="main">
      <div class="content">
        <h1>Welcome to {{ title }}!</h1>
        <button
            matMiniFab
            aria-label="Swap conversion direction"
            (click)="switchTheme()"
        >
          <mat-icon>{{ currentTheme === 'light' ? "bedtime" : "sunny" }}</mat-icon>
        </button>
       
        <app-pace-convertor></app-pace-convertor>
        <app-pace-calculator></app-pace-calculator>
        <app-hr-zones-calculator></app-hr-zones-calculator>
      </div>
    </main>
    <router-outlet></router-outlet>
  `,
  styles: [`
    
  `],
})
export class App {
  title = 'pace-calculator';
  currentTheme: 'light' | 'dark' = 'light';

  switchTheme(){
    const htmlElement = document.querySelector('html');
    if (!htmlElement) return;

    // Toggle the class
    if (this.currentTheme === 'light') {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      this.currentTheme = 'dark';
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      this.currentTheme = 'light';
    }
  }
}
