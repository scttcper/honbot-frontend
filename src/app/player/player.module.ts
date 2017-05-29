import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { Api } from '../api';
import { PlayerComponent } from './player.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewHeroesComponent } from './overview/overview-heroes.component';
import { MatchesComponent } from './matches/matches.component';
import { HbUtility } from '../util';
import { SkillBracketComponent } from './skill-bracket.component';
import { HeroesComponent } from './heroes/heroes.component';
import { OverviewMatchesComponent } from './overview/overview-matches.component';

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
    PlayerComponent,
    MatchesComponent,
    OverviewComponent,
    SkillBracketComponent,
    HeroesComponent,
    OverviewHeroesComponent,
    OverviewMatchesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    AdsenseModule,
    HbUtility,
    NgxPaginationModule,
  ],
  exports: [RouterModule],
  providers: [Api],
})
export class PlayerModule { }
