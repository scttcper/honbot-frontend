import { NgModule } from '@angular/core';
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
  declarations: all,
  exports: all,
})
export class HbUtility { }

export * from './util';
