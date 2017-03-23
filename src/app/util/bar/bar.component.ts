import { Component, Input } from '@angular/core';

@Component({
  selector: 'hb-bar',
  template: `
    <div class="bar">
      <div class="segment" [style.width.%]="value / max * 100"></div>
    </div>
  `,
})
export class BarComponent {
  @Input() value: number;
  @Input() max: string;
}
