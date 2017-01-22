import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'hb-back',
  template: `<button class="btn btn-lg btn-secondary" (click)="back()">Back</button>
  `,
})
export class BackComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }

}
