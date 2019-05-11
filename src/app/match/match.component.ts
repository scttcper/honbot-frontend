import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';
import { getQuality, getSkillBracket } from '../util';

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
  styles: [
    `
      td {
        line-height: 2.1rem;
      }
    `,
  ],
})
export class MatchComponent implements OnInit {
  match: any = {};
  matchId: string;
  team1 = [];
  team2 = [];
  teamNames = ['Legion', 'Hellbourne'];
  winner: number;
  teamTotals: any = [{}, {}];
  skillBracket: string;
  quality: string;
  matchError = false;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private title: Title,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.matchError = false;
      this.loading = true;
      this.matchId = params.matchId;
      this.title.setTitle(
        `Match: ${this.matchId} - honbot.com heroes of newerth match stats`,
      );
      this.api
        .getMatch(this.matchId)
        .subscribe(m => this.setupMatch(m), err => (this.matchError = true));
      this.api
        .getMatchSkill(this.matchId)
        .subscribe(
          m => this.setupSkill(m),
          () => console.error('skill not found'),
        );
    });
  }
  setupMatch(match: any) {
    this.loading = false;
    match.duration = new Date(match.length * 1000).toISOString().substr(11, 8);
    match.players = match.players.sort((a, b) => a.position - b.position);
    match.players.forEach(p => {
      this[`team${p.team}`].push(p);
      const tt = this.teamTotals[p.team - 1];
      needsTotal.forEach(v => {
        if (tt[v] === undefined) {
          tt[v] = 0;
        }
        tt[v] += p[v];
      });
    });
    this.winner = Number(this.teamTotals[0].win < this.teamTotals[1].win);
    this.match = match;
  }
  setupSkill(info: any) {
    this.skillBracket = getSkillBracket(info.averageScore);
    this.quality = getQuality(info.quality);
  }
}
