import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrendModule } from 'ngx-trend';

import { Api } from '../api';
import { PlayerComponent } from './player.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewHeroesComponent } from './overview/overview-heroes.component';
import { MatchesComponent } from './matches/matches.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HbUtility } from '../util';
import { SkillBracketComponent } from './skill-bracket.component';
import { OverviewMatchesComponent } from './overview/overview-matches.component';
import { OverviewCompetitionComponent } from './overview/overview-competition.component';

export const routes: Routes = [{
    path: '',
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
    HbUtility,
    NgxPaginationModule,
    TrendModule,
  ],
  exports: [RouterModule],
  providers: [Api],
})
export class PlayerModule { }
