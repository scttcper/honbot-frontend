import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

const needsSum = [
  'win',
  'kills',
  'deaths',
  'assists',
  'gpm',
];

@Component({
  selector: 'hb-overview-heroes',
  template: `
  <legend class="mt-2">
    Most Played Heroes <small>All Time</small>
    <small class="float-right mt-3"><a [routerLink]="['heroes']">+more</a></small>
  </legend>
  <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>Hero</th>
        <th>Matches</th>
        <th>Win %</th>
        <th ngbTooltip="(kills+assists)/deaths" container="body">KDA</th>
        <th>GPM</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngIf="loading" class="text-center">
        <td colspan="5">
          <hb-loading></hb-loading>
        </td>
      </tr>
      <tr *ngFor="let h of heroes">
        <td>
          <img width="45" height="45" alt="hero icon" src="https://www.heroesofnewerth.com/images/heroes/{{h.hero_id}}/icon_128.jpg">
          {{ h.lastMatch | timeAgo }}
        </td>
        <td class="p-1">
          <div class="pb-1">{{ h.matches | number }}</div>
          <hb-bar [value]="h.matches" [max]="maxHeroes.matches"></hb-bar>
        </td>
        <td class="p-1">
          <div class="pb-1">{{ h.winPercent | number:'1.0-1' }}%</div>
          <hb-bar [value]="h.winPercent" [max]="maxHeroes.winPercent"></hb-bar>
        </td>
        <td class="p-1">
          <div class="pb-1">{{ h.kda | number:'1.0-2' }}</div>
          <hb-bar [value]="h.kda" [max]="maxHeroes.kda"></hb-bar>
        </td>
        <td class="p-1">
          <div class="pb-1">{{ h.gpm | number:'1.0-0' }}</div>
          <hb-bar [value]="h.gpm" [max]="maxHeroes.gpm"></hb-bar>
        </td>
      </tr>
    </tbody>
  </table>
  `,
})
export class OverviewHeroesComponent implements OnChanges {
  @Input() matches;
  heroes: any[] = [];
  maxHeroes: any = {};
  loading = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.matches && changes.matches.currentValue) {
      this.setupHeroes();
    }
  }
  setupHeroes() {
    this.loading = false;
    const heroes = {};
    this.matches.map((m) => {
      if (!heroes[m.hero_id]) {
        heroes[m.hero_id] = {
          hero_id: m.hero_id,
          lastMatch: m.date,
          matches: 0,
          win: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          gpm: 0,
        };
      }
      heroes[m.hero_id].matches += 1;
      needsSum.map((n) => {
        if (n === 'win') {
          heroes[m.hero_id].win += m.win ? 1 : 0;
          return;
        }
        heroes[m.hero_id][n] += m[n];
      });
    });
    const allHeroes = _.toArray(heroes);
    this.heroes = _.sortBy(allHeroes, 'matches').reverse().slice(0, 10);
    this.heroes = this.heroes.map((n) => {
      n.winPercent = (n.win / n.matches) * 100;
      n.kda = (n.kills + n.assists) / n.deaths;
      n.gpm = n.gpm / n.matches;
      return n;
    });
    needsSum.map((n) => {
      this.maxHeroes[n] = _.maxBy(this.heroes, _.identity(n))[n];
    });
    this.maxHeroes.matches = _.maxBy<any>(this.heroes, _.identity('matches')).matches;
    this.maxHeroes.maxHeroes = _.maxBy<any>(this.heroes, _.identity('winPercent')).winPercent;
    this.maxHeroes.kda = _.maxBy<any>(this.heroes, _.identity('kda')).kda;
  }

}
