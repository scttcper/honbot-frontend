import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { maxBy, property } from 'lodash-es';

import { Api } from '../api';

@Component({
  selector: 'hb-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  search = '';
  match = '';
  recent: any[];
  matches: any;
  loadedLastDay: any;
  teamNames = ['Legion', 'Hellbourne'];
  latestMatchesLoading = true;
  maxLength = 0;
  constructor(
    private router: Router,
    private api: Api,
    title: Title,
  ) {
    title.setTitle('honbot - Heroes of Newerth Player Stats');
  }

  ngOnInit() {
    this.api.getServerStats().subscribe((res) => {
      this.matches = (res.matches / 1000000).toFixed(2);
      this.loadedLastDay = res.loadedLastDay;
    });
    this.api.getLatestMatches().subscribe((res) => {
      this.latestMatchesLoading = false;
      // console.log(res)
      this.recent = res.map((match) => {
        match.team1 = [];
        match.team2 = [];
        match.teamTotals = [{}, {}];
        match.players = match.players.sort((a, b) => a.position - b.position);
        for (const p of match.players) {
          match[`team${p.team}`].push(p);
          ['win'].map((v) => {
            const tt = match.teamTotals[p.team - 1];
            if (tt[v] === undefined) {
              tt[v] = 0;
            }
            tt[v] += p[v];
          });
        }
        match.duration = new Date(match.length * 1000).toISOString().substr(11, 8);
        match.players = match.players.sort((a, b) => a.position - b.position);
        match.winner = Number(match.teamTotals[0].win < match.teamTotals[1].win);
        return match;
      });
      const max = maxBy<any>(this.recent, property('length'));
      this.maxLength = max ? max.length : 0;
    });
  }

  goPlayer() {
    this.router.navigate(['/player', this.search]);
  }

  goMatch() {
    this.router.navigate(['/match', this.match]);
  }

}
