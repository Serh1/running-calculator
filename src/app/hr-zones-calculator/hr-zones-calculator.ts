import {Component, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ZoneLabel} from "./zone-label/zone-label";
import {Zone} from "../model";

@Component({
    selector: 'app-hr-zones-calculator',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatMiniFabButton,
        MatSuffix,
        MatFormField,
        ZoneLabel
    ],
    template: `
        <mat-card class="convert-card" appearance="outlined">
            <mat-card-header class="card-header">Calculate HR-zones / paces based of max HR</mat-card-header>
            <mat-card-content style="display: flex;flex-direction: column">
                <mat-form-field appearance="fill" class="input-field">
                    <mat-label>Max heart-rate</mat-label>
                    <span matSuffix>km</span>
                    <input
                            matInput
                            type="number"
                            [(ngModel)]="inputMaxHR"
                            placeholder="0.00"
                    />
                </mat-form-field>
                <div style="display: flex; flex-direction: row; gap: 0.2rem;justify-content: space-between">
                    @for (zone of zones(); track zone.id) {
                        <app-zone-label [zone]="zone"></app-zone-label>
                    }
                </div>


            </mat-card-content>

            <mat-card-actions class="card-actions">
                <div style="display: flex;gap: 1rem;">
                    <button matButton="filled"
                            (click)="calculateHRZones()">
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
        
    `
})
export class HrZonesCalculator {
    inputMaxHR: number | null = null;
    zones = signal<Zone[]>([{
        id:1,
        min:130,
        max:140,
    },{
        id:2,
        min:140,
        max:152,
    },{
        id:3,
        min:152,
        max:163,
    },{
        id:4,
        min:163,
        max:177,
    },{
        id:5,
        min:177,
        max:190,
    }])

    calculateHRZones() {

    }

    reset() {

    }
}
