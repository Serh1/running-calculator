import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-pace-convertor',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatSuffix,
    MatFormField,
    MatCardHeader
  ],
  template: `

    <mat-card class="convert-card" appearance="outlined">
      <mat-card-header class="card-header">Convert pace from min/mile to min/km</mat-card-header>
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
        <div style="display: flex;gap: 1rem">
          <button
              mat-flat-button
              color="primary"
              (click)="convert()"
          >
            CALCULATE
          </button>
          <button matMiniFab
                  (click)="reset()">
            <mat-icon>refresh</mat-icon>
          </button>
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
  `,
  styles: ``
})
export class PaceConvertor {
// direction flag
  isMileToKm = true;

  // bind these to the two fields
  inputPace: number | null = null;
  outputPace: number | null = null;

  private readonly MILES_TO_KM = 1.60934;

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
}
