import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AdsenseModule } from 'ng2-adsense';

import { HbUtility } from '../util';
import { MatchComponent } from './match.component';

export const routes: Routes = [{
  path: 'match/:matchId',
  component: MatchComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    AdsenseModule,
    NgbTooltipModule.forRoot(),

    HbUtility,
  ],
  declarations: [
    MatchComponent,
  ],
})
export class MatchModule { }
