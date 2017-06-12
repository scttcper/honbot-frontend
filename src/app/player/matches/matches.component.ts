import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import * as _ from 'lodash';

import { subWeeks, subMonths, subYears, isAfter } from 'date-fns';
import { Api } from '../../api';

@Component({
  selector: 'hb-player-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  loading = false;
  matches: any[];
  unfiltered: any[];
  maxLength = 0;

  time = '';
  mode = '';
  lobby = '';
  team = '';
  length = '';

  config: PaginationInstance = {
    id: 'matches',
    itemsPerPage: 15,
    currentPage: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.api
        .getPlayerMatches(params['nickname'])
        .subscribe((res) => {
          this.unfiltered = res.matches;
          const max = _.maxBy(this.matches, _.property('length')) || {};
          this.maxLength = max.length || 0;
          this.applyFilters();
        });
    });
  }
  applyFilters() {
    const date = this.selectedDate();
    this.matches = _.filter(this.unfiltered, (n) => {
      return this.filterTime(n, date) &&
        this.filterMode(n) &&
        this.filterTeam(n) &&
        this.filterLobby(n);
    });
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

}
