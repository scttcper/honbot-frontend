import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BarComponent } from './bar.component';
import { LoadingComponent } from './loading.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { SkillBracketPipe } from './util';

const all = [
  SkillBracketPipe,
  TimeAgoPipe,
  LoadingComponent,
  BarComponent,
];

@NgModule({
  imports: [MatProgressSpinnerModule],
  declarations: all,
  exports: all,
})
export class HbUtility { }

export * from './util';
