import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import * as _ from 'lodash';

import { Api } from '../../api';

@Component({
  selector: 'hb-player-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  loading = false;
  matches: any[];
  maxLength = 0;

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
          this.matches = res.matches;
          const max = _.maxBy(this.matches, _.property('length')) || {};
          this.maxLength = max.length || 0;
        });
    });
  }

}
