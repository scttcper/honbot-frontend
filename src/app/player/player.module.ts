import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdsenseModule } from 'ng2-adsense';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrendModule } from 'ngx-trend';

import { Api } from '../api';
import { HbUtility } from '../util';
import { HeroesComponent } from './heroes/heroes.component';
import { MatchesComponent } from './matches/matches.component';
import { OverviewCompetitionComponent } from './overview/overview-competition.component';
import { OverviewHeroesComponent } from './overview/overview-heroes.component';
import { OverviewMatchesComponent } from './overview/overview-matches.component';
import { OverviewComponent } from './overview/overview.component';
import { PlayerComponent } from './player.component';
import { SkillBracketComponent } from './skill-bracket.component';

export const routes: Routes = [{
    path: 'player/:nickname',
    component: PlayerComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'heroes', component: HeroesComponent },
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
    OverviewCompetitionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),

    NgbModule,
    AdsenseModule,
    NgxPaginationModule,
    TrendModule,

    HbUtility,
  ],
  exports: [RouterModule],
  providers: [Api],
})
export class PlayerModule { }
