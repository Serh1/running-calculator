import {Component, Input} from '@angular/core';
import {Zone} from "../../model";

@Component({
  selector: 'app-zone-label',
  imports: [],
  template: `
      <div class="zone-container">
          <div class="zone-interval">{{ zone.min }}-{{ zone.max }}</div>
          <div class="zone-label">Zone {{ zone.id }}</div>
      </div>
  `,
  styles: `
    .zone-container {
      padding: 0.6rem;
      background: var(--mat-sys-on-secondary-container);
      color: white;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.1rem;
    }
  
    .zone-interval{
        font-size: 0.5rem;
        font-weight: bold;
    }
    .zone-label{
      font-size: 0.4rem;
    }
  `
})
export class ZoneLabel {
    @Input() zone!: Zone;

}
