import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Api } from '../api';
import { getLobby } from '../util';

@Component({
  selector: 'hb-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  match: any;
  matchId: string;
  team1: any;
  team2: any;
  lobby: string;

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
    this.match.players = this.match.players.sort((a, b) => a.position - b.position);
    const g = _.groupBy(this.match.players, _.property('team'));
    this.team1 = g[1];
    this.team2 = g[2];
    this.lobby = getLobby(match);
  }

}
