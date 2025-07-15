import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
              <mat-card class="convert-card" appearance="filled">
                  <mat-card-content class="inputs-wrapper">
                      <!-- Left field: input -->
                      <mat-form-field appearance="fill" class="input-field">
                          <mat-label>ex. {{ isMileToKm ? '7.00' : '4.30' }}</mat-label>
                          <span matSuffix>
                {{ isMileToKm ? 'min/mile' : 'min/km' }}
              </span>
                          <input
                                  matInput
                                  type="number"
                                  [(ngModel)]="inputPace"
                                  placeholder="0.00"
                          />
                      </mat-form-field>

                      <mat-form-field appearance="fill" class="input-field">
                          <mat-label>Result</mat-label>
                          <span matSuffix>
                {{ isMileToKm ? 'min/km' : 'min/mile' }}
              </span>
                          <input
                                  matInput
                                  type="number"
                                  [value]="outputPace"
                                  [readonly]="isMileToKm"
                                  (ngModelChange)="!isMileToKm && convert()"
                                  [(ngModel)]="outputPace"
                                  placeholder="–"
                          />
                      </mat-form-field>
                  </mat-card-content>

                  <mat-card-actions class="card-actions">
                      <div>

                          <button
                                  mat-flat-button
                                  color="primary"
                                  (click)="convert()"
                          >
                              CALCULATE
                          </button>
                          <button mat-button (click)="reset()">RESET</button>
                      </div>
                      <button
                              matMiniFab="filled"
                              aria-label="Swap conversion direction"
                              (click)="swap()"
                      >
                          <mat-icon>swap_horiz</mat-icon>
                      </button>

                  </mat-card-actions>
              </mat-card>
          </div>
      </main>
      <router-outlet></router-outlet>
  `,
  styles: [`
    main {
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      box-sizing: border-box;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 500px;
    }

    .convert-card {
      padding: 1.5rem;
    }

    .inputs-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    @media (max-width: 600px) {
      .inputs-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    .input-field {
      width: 100%;
    }
    
    .card-actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  `],
})
export class App {
  title = 'pace-calculator';

  // direction flag
  isMileToKm = true;

  // bind these to the two fields
  inputPace: number | null = null;
  outputPace: number | null = null;

  private readonly MILES_TO_KM = 1.60934;
  currentTheme: 'light' | 'dark' = 'light';

  swap() {
    // flip direction, clear fields
    this.isMileToKm = !this.isMileToKm;
    this.reset();
  }

  convert() {
    if (this.inputPace == null || isNaN(this.inputPace)) return;

    if (this.isMileToKm) {
      // min/mile → min/km
      this.outputPace = parseFloat(
          (this.inputPace / this.MILES_TO_KM).toFixed(2)
      );
    } else {
      // min/km → min/mile
      this.outputPace = parseFloat(
          (this.inputPace * this.MILES_TO_KM).toFixed(2)
      );
    }
  }

  reset() {
    this.inputPace = null;
    this.outputPace = null;
  }

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
