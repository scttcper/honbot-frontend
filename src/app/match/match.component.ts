import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Api } from '../api';
import { getLobby } from '../util';

const needsTotal = [
  'kills',
  'deaths',
  'assists',
  'cs',
  'denies',
  'gpm',
  'apm',
  'xpm',
  'wards',
  'herodmg',
  'bdmg',
  'level',
];

@Component({
  selector: 'hb-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  match: any = {};
  matchId: string;
  team1: any;
  team2: any;
  lobby: string;
  teamNames = ['Legion', 'Hellbourne'];
  winner: number;
  teamTotals: any = [{}, {}];

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.api
      .getMatch(this.matchId)
      .then((m) => this.setupMatch(m));
  }
  setupMatch(match: any) {
    this.match = match;
    this.match.duration = new Date(match.length * 1000).toISOString().substr(11, 8);
    this.match.players = this.match.players.sort((a, b) => a.position - b.position);
    const g = _.groupBy(this.match.players, _.property('team'));
    this.team1 = g[1];
    this.team2 = g[2];
    this.lobby = getLobby(match);
    for (const p of match.players) {
      for (const v of needsTotal) {
        if (!_.has(this.teamTotals[p.team - 1], v)) {
          this.teamTotals[p.team - 1][v] = 0;
        }
        this.teamTotals[p.team - 1][v] += p[v];
      }
    }
    this.winner = this.teamTotals[0].wins > this.teamTotals[1].wins ? 0 : 1;
  }


}
