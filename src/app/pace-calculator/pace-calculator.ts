import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-pace-calculator',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix,
        MatFormField,
        MatCardHeader,
        MatChipListbox,
        MatChipOption,
        MatIcon,
        MatMiniFabButton
    ],
    template: `
        <mat-card class="convert-card" appearance="outlined">
            <mat-card-header class="card-header">Calculate pace using distance and time</mat-card-header>
            <mat-card-content class="card-content">
                <div>
                    <mat-chip-listbox [(ngModel)]="inputDistance" (ngModelChange)="onChipOrInputChange($event)">
                        @for (customDistance of customDistances(); track customDistance) {
                            <mat-chip-option [value]="customDistance">{{ customDistance }}</mat-chip-option>
                        }
                    </mat-chip-listbox>
                    <mat-form-field appearance="fill" class="input-field">
                        <mat-label>Distance</mat-label>
                        <span matSuffix>km</span>
                        <input
                                matInput
                                type="number"
                                [(ngModel)]="inputDistance"
                                (ngModelChange)="onChipOrInputChange($event)"
                                placeholder="0.00"
                        />
                    </mat-form-field>
                   

                    <mat-form-field appearance="fill" class="input-field">
                        <mat-label>Time</mat-label>
                        <span matSuffix>hh:mm:ss</span>
                        <input
                                matInput
                                type="string"
                                [(ngModel)]="inputTime"
                                placeholder="3h28m45s"
                        />
                    </mat-form-field>
                </div>

                <div class="label">
                    <h1 class="value">{{ pace }}</h1>
                    <div class="unit">min/km</div>
                </div>
            </mat-card-content>

            <mat-card-actions class="card-actions">
                <div style="display: flex;gap: 1rem">
                    <button matButton="filled"
                            (click)="calculatePace()">
                        CALCULATE
                    </button>
                    <button matMiniFab
                            (click)="reset()">
                        <mat-icon>refresh</mat-icon>
                    </button>
                </div>
            </mat-card-actions>
        </mat-card>
    `,
    styles: `
      .card-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;
      }

      .label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .value {
          padding: 0px;
          font-size: 2.5rem;
          margin: 0;
        }

        .unit {
          color: #888;
        }
      }

    `
})
export class PaceCalculator {
    inputDistance: number | null = null;
    inputTime: string | null = null;
    pace: string | null = "5.30";

    customDistances = signal([5, 10, 21.1, 42.195, 100]);
    onChipOrInputChange(value: number) {
        this.inputDistance = value;
    }

    calculatePace() {
        if (
            this.inputDistance === null ||
            this.inputDistance <= 0 ||
            !this.inputTime ||
            !/^(\d{1,2}h)?(\d{1,2}m)?(\d{1,2}s)?$/.test(this.inputTime)
        ) {
            this.pace = "Invalid input";
            return;
        }

        let hh = 0, mm = 0, ss = 0;
        const hMatch = this.inputTime.match(/(\d{1,2})h/);
        const mMatch = this.inputTime.match(/(\d{1,2})m/);
        const sMatch = this.inputTime.match(/(\d{1,2})s/);

        if (hMatch) hh = Number(hMatch[1]);
        if (mMatch) mm = Number(mMatch[1]);
        if (sMatch) ss = Number(sMatch[1]);

        if (
            hh < 0 || hh > 60 ||
            mm < 0 || mm > 60 ||
            ss < 0 || ss > 60
        ) {
            this.pace = "Invalid time";
            return;
        }

        const totalMinutes = hh * 60 + mm + ss / 60;
        if (totalMinutes === 0) {
            this.pace = "Invalid time";
            return;
        }

        const paceValue = totalMinutes / this.inputDistance;
        this.pace = `${Math.floor(paceValue)}.${Math.round((paceValue % 1) * 60).toString().padStart(2, '0')}`;
    }

    reset() {
        this.inputDistance = null;
        this.inputTime = null;
        this.pace = "5.30";
    }
}
