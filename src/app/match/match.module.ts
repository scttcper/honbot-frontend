import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdsenseModule } from 'ng2-adsense';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatchComponent } from './match.component';
import { HbUtility } from '../util';

export const routes: Routes = [{
  path: 'match/:matchId',
  component: MatchComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    AdsenseModule,
    NgbModule,

    HbUtility,
  ],
  declarations: [
    MatchComponent,
  ],
})
export class MatchModule { }
