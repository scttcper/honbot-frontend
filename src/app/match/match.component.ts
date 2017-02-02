import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';

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
  team1 = [];
  team2 = [];
  teamNames = ['Legion', 'Hellbourne'];
  winner: number;
  teamTotals: any = [{}, {}];
  matchError = false;
  skillBracket: string;
  quality: string;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.matchId = this.route.snapshot.params['matchId'];
    this.api
      .getMatch(this.matchId)
      .subscribe(
        (m) => this.setupMatch(m),
        (err) => this.matchError = true,
      );
    this.api
      .getMatchSkill(this.matchId)
      .subscribe(
        (m) => this.setupSkill(m),
        (err) => console.log('skill not found'),
      );
  }
  setupMatch(match: any) {
    match.duration = new Date(match.length * 1000).toISOString().substr(11, 8);
    match.players = match.players.sort((a, b) => a.position - b.position);
    // match.fromNow = moment(match.date).fromNow();
    for (const p of match.players) {
      const key = `team${p.team}`;
      this[key].push(p);
      const tnumber = p.team - 1;
      for (const v of needsTotal) {
        if (this.teamTotals[tnumber][v] === undefined) {
          this.teamTotals[tnumber][v] = 0;
        }
        this.teamTotals[tnumber][v] += p[v];
      }
    }
    this.winner = Number(this.teamTotals[0].win < this.teamTotals[1].win);
    this.match = match;
  }
  setupSkill(info: any) {
    // this.skillBracket = getSkillBracket(info.averageScore);
    // this.quality = getQuality(info.quality);
  }


}
