import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AdsenseModule } from 'ng2-adsense';

import { HbUtility } from '../util';
import { MatchComponent } from './match.component';
import { TeamGraphComponent } from './team-graph.component';

export const routes: Routes = [{
  path: 'match/:matchId',
  component: MatchComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    AdsenseModule,
    NgbTooltipModule,
    ChartjsModule,

    HbUtility,
  ],
  declarations: [
    MatchComponent,
    TeamGraphComponent,
  ],
})
export class MatchModule { }
