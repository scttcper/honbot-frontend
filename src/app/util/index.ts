import { NgModule } from '@angular/core';
import { SkillBracketPipe, MatchModePipe } from './util';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [SkillBracketPipe, MatchModePipe, TimeAgoPipe],
  exports: [SkillBracketPipe, MatchModePipe, TimeAgoPipe],
})
export class HbUtility { }

export * from './util';
