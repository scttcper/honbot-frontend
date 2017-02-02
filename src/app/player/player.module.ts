import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2PaginationModule } from 'ng2-pagination';

import { Api } from '../api';
import { Bar } from '../bar/bar.component';
import { PlayerComponent } from './player.component';
import { OverviewComponent } from './overview/overview.component';
import { MatchesComponent } from './matches/matches.component';
import { HbUtility } from '../util';
import { SkillBracketComponent } from './skill-bracket.component';

export const routes: Routes = [{
    path: 'player/:nickname',
    component: PlayerComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'matches', component: MatchesComponent },
    ],
  },
];

@NgModule({
  declarations: [
    Bar,
    PlayerComponent,
    MatchesComponent,
    OverviewComponent,
    SkillBracketComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    AdsenseModule,
    HbUtility,
    Ng2PaginationModule,
  ],
  exports: [RouterModule],
  providers: [Api],
})
export class PlayerModule { }
