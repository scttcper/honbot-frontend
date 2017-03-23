import { NgModule } from '@angular/core';
import { SkillBracketPipe } from './util';
import { TimeAgoPipe } from './time-ago.pipe';
import { LoadingComponent } from './loading.component';
import { BarComponent } from './bar/bar.component';

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
