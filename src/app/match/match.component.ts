import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Api } from '../api';
import { getMode } from '../util';

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
  'win',
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
      .subscribe((m) => this.setupMatch(m));
  }
  setupMatch(match: any) {
    match.duration = new Date(match.length * 1000).toISOString().substr(11, 8);
    match.players = match.players.sort((a, b) => a.position - b.position);
    const g = _.groupBy(match.players, _.property('team'));
    this.team1 = g[1];
    this.team2 = g[2];
    match.mode = getMode(match);
    match.fromNow = moment(match.date).fromNow();
    for (const p of match.players) {
      for (const v of needsTotal) {
        if (!_.has(this.teamTotals[p.team - 1], v)) {
          this.teamTotals[p.team - 1][v] = 0;
        }
        this.teamTotals[p.team - 1][v] += p[v];
      }
    }
    this.winner = Number(this.teamTotals[0].win < this.teamTotals[1].win);
    this.match = match;
  }


}
