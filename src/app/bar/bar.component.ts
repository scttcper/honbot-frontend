import { Component, Input } from '@angular/core';

@Component({
  selector: 'bar',
  template: `
    <div class="bar bar-default">
      <div class="segment segment-duration" [style.width.%]="value / max * 100"></div>
    </div>
  `,
})
export class Bar {
  @Input() value: number;
  @Input() max: string;
}
