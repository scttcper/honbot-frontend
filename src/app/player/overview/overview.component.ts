import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Api } from '../../api';

const needsSum = [
  'win',
  'loss',
  'kills',
  'deaths',
  'assists',
  'gpm',
];

@Component({
  selector: 'hb-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  loading = true;
  matches: any[];
  heroes: any[];
  maxHeroes = {};
  maxLength = 0;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.loading = true;
      this.api
        .getPlayerMatches(params['nickname'])
        .subscribe((res) => {
          this.loading = false;
          this.matches = res.matches.slice(0, 10);
          const max = _.maxBy(this.matches, _.property('length')) || {};
          this.maxLength = max.length || 0;
          this.setupHeroes(res.matches);
        });
    });
  }
  setupHeroes(matches: any) {
    const heroes = {};
    for (const m of matches) {
      if (!heroes[m.hero_id]) {
        heroes[m.hero_id] = {
          hero_id: m.hero_id,
          lastMatch: m.date,
          matches: 0,
          win: 0,
          loss: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          gpm: 0,
        };
      }
      heroes[m.hero_id].matches += 1;
      for (const n of needsSum) {
        if (n === 'win') {
          heroes[m.hero_id].win += m.win ? 1 : 0;
          continue;
        } else if (n === 'loss') {
          heroes[m.hero_id].loss += m.loss ? 0 : 1;
          continue;
        }
        heroes[m.hero_id][n] += m[n];
      }
    }
    const allHeroes = _.toArray(heroes);
    this.heroes = _.sortBy(allHeroes, 'matches').reverse().slice(0, 10);
    this.heroes = this.heroes.map((n) => {
      n.winPercent = (n.win / n.loss) * 100;
      n.kda = (n.kills + n.assists) / n.deaths;
      n.gpm = n.gpm / n.matches;
      return n;
    });
    for (const n of needsSum) {
      this.maxHeroes[n] = _.maxBy(this.heroes, _.identity(n))[n];
    }
    this.maxHeroes['matches'] = _.maxBy(this.heroes, _.identity('matches'))['matches'];
    this.maxHeroes['winPercent'] = _.maxBy(this.heroes, _.identity('winPercent'))['winPercent'];
    this.maxHeroes['kda'] = _.maxBy(this.heroes, _.identity('kda'))['kda'];
  }

}
