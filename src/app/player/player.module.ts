import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Api } from '../api';
import { Bar } from '../bar/bar.component';
import { PlayerComponent } from './player.component';
import { OverviewComponent } from './overview/overview.component';
import { MatchesComponent } from './matches/matches.component';
import { TimeAgoPipe } from '../time-ago.pipe';

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
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    AdsenseModule,
  ],
  exports: [RouterModule],
  providers: [Api],
})
export class PlayerModule { }
