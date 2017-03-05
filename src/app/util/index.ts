import { NgModule } from '@angular/core';
import { SkillBracketPipe } from './util';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [SkillBracketPipe, TimeAgoPipe],
  exports: [SkillBracketPipe, TimeAgoPipe],
})
export class HbUtility { }

export * from './util';
