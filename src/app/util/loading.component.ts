import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hb-loading',
  template: `
  <div class="d-flex flex-row justify-content-center mt-3 mb-3">
    <mat-progress-spinner
      [color]="color"
      mode="indeterminate">
    </mat-progress-spinner>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

}
