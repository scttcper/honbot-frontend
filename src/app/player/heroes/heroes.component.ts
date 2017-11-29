import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { isAfter, subMonths, subWeeks, subYears } from 'date-fns';
import { filter, maxBy, property, sortBy, values } from 'lodash-es';

import { Api } from '../../api';

@Component({
  selector: 'hb-player-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
  loading = true;
  unfiltered: any[];
  heroes: any[];
  maxMatches = 0;
  // maxWinPercent = 0;
  maxGpm = 0;
  maxKda = 0;
  maxWards = 0;
  maxXpm = 0;

  totalMatches = 0;
  totalPercent = 0;
  totalKills = 0;
  totalDeaths = 0;
  totalWards = 0;
  totalSmackdown = 0;
  avgGpm = 0;
  avgApm = 0;
  avgKda = 0;
  avgXpm = 0;

  time = '';
  mode = '';
  lobby = '';
  team = '';
  length = '';

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.parent.params.subscribe((params) => {
      this.api
        .getPlayerMatches(params['nickname'])
        .subscribe((res) => {
          this.unfiltered = res.matches;
          this.applyFilters();
        },
        () => this.loading = false,
        () => this.loading = false);
    });
  }

  applyFilters() {
    const date = this.selectedDate();
    this.heroes = this.groupByHero(filter(this.unfiltered, (n) => {
      return this.filterTime(n, date) &&
        this.filterMode(n) &&
        this.filterTeam(n) &&
        this.filterLobby(n);
    }));
  }
  selectedDate() {
    switch (this.time) {
      case 'week':
        return subWeeks(new Date(), 1);
      case 'month':
        return subMonths(new Date(), 1);
      case '3month':
        return subMonths(new Date(), 3);
      case '6month':
        return subMonths(new Date(), 6);
      case 'year':
        return subYears(new Date(), 1);
    }
    return new Date(0);
  }
  filterTime(match, date) {
    return new Date(match.date) >= date;
  }
  filterMode(match) {
    if (!this.mode || this.mode === 'all') {
      return true;
    }
    return this.mode === match.mode;
  }
  filterLobby(match) {
    if (!this.lobby || this.lobby === 'all') {
      return true;
    }
    return this.lobby === match.type;
  }
  filterTeam(match) {
    if (!this.team || this.team === 'all') {
      return true;
    }
    const t = this.team === 'legion' ? 1 : 2;
    return match.team === t;
  }
  groupByHero(matches) {
    if (!matches.length) {
      return matches;
    }
    this.totalMatches = matches.length;
    this.totalPercent = 0;
    this.totalKills = 0;
    this.totalDeaths = 0;
    this.totalWards = 0;
    this.avgGpm = 0;
    this.avgApm = 0;
    this.avgXpm = 0;
    this.avgKda = 0;
    let totalWin = 0;
    const res: any = {};
    matches.map((n) => {
      if (!res[n.hero_id]) {
        res[n.hero_id] = {
          matches: 0,
          hero_id: n.hero_id,
          win: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          gpm: 0,
          wards: 0,
          xpm: 0,
          lastMatch: new Date(0),
        };
      }
      const h = res[n.hero_id];
      h.matches += 1;
      h.kills += n.kills;
      h.deaths += n.deaths;
      h.win += n.win ? 1 : 0;
      h.assists += n.assists;
      h.gpm += n.gpm;
      h.wards += n.wards;
      h.xpm += n.xpm;
      const d = new Date(n.date);
      if (!isAfter(h.lastMatch, d)) {
        h.lastMatch = d;
      }
      this.totalKills += n.kills;
      this.totalDeaths += n.deaths;
      this.totalWards += n.wards;
      this.totalSmackdown += n.smackdown;
      this.avgXpm += n.xpm;
      this.avgGpm += n.gpm;
      this.avgApm += n.apm;
      totalWin += n.win ? 1 : 0;
    });
    const vals = sortBy(values(res), property('matches'))
      .reverse()
      .map((n: any) => {
        n.winPercent = (n.win / n.matches) * 100;
        n.kda = (n.kills + n.assists) / n.deaths;
        n.gpm = n.gpm / n.matches;
        n.xpm = n.xpm / n.matches;
        n.wards = n.wards / n.matches;
        return n;
      });
    this.avgGpm = this.avgGpm / matches.length;
    this.avgApm = this.avgApm / matches.length;
    this.avgXpm = this.avgXpm / matches.length;
    this.avgKda = this.totalKills / this.totalDeaths;
    this.totalPercent = (totalWin / matches.length) * 100;
    this.maxMatches = vals[0].matches;
    // this.maxWinPercent = maxBy(vals, property('winPercent')).winPercent;
    this.maxGpm = maxBy(vals, property('gpm')).gpm;
    this.maxWards = maxBy(vals, property('wards')).wards;
    this.maxXpm = maxBy(vals, property('xpm')).xpm;
    this.maxKda = maxBy(vals, (n) => {
      if (isFinite(n.kda)) {
        return n.kda;
      }
      return 0;
    }).kda;
    // this.maxDeaths = maxBy<any>(vals, property('deaths')).deaths;
    return vals;
  }
}
