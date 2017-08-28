import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { differenceInDays } from 'date-fns';

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
  template: `
  <div class="row" *ngIf="!playerError">
    <div class="col-lg-8">
      <hb-overview-heroes [matches]="matches"></hb-overview-heroes>
      <hb-overview-matches [matches]="matches"></hb-overview-matches>
    </div>
    <div class="col-lg-4">
      <legend class="mt-2">
        Activity
        <small class="mt-3">30 Days</small>
      </legend>
      <ngx-trend *ngIf="activity"
        [data]="activity"
        [gradient]="gradient"
        [smooth]="true"
        [strokeWidth]="2"
        [height]="200"
        [padding]="5"
      >
      </ngx-trend>

      <div class="row adsbygoogle">
        <div class="col-12">
          <div class="mt-3 text-center">
            <ng2-adsense></ng2-adsense>
          </div>
        </div>
      </div>
      <hb-overview-competition></hb-overview-competition>
    </div>
  </div>
  `,
})
export class OverviewComponent implements OnInit {
  loading = true;
  matches: any[];
  heroes: any[];
  maxHeroes: any = {};
  playerError = false;
  activity: number[];
  gradient = ['grey', 'lightgreen', 'green'];

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.playerError = false;
      this.loading = true;
      this.matches = undefined;
      this.heroes = undefined;
      const activity = _.fill(Array(30), 0);
      this.api
        .getPlayerMatches(params['nickname'])
        .subscribe(
          (res) => {
            this.matches = res.matches;
            const now = new Date();
            this.matches.map((n) => {
              const date = new Date(n.date);
              const diff = differenceInDays(date, now);
              if (diff > -30) {
                activity[29 + diff] += 1;
              }
            });
            this.activity = activity;
          },
          () => this.playerError = true,
          () => this.loading = false,
        );
    });
  }

}
