import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { differenceInDays } from 'date-fns';
import { format } from 'date-fns';
import { fill } from 'lodash-es';

import { Api } from '../../api';

@Component({
  selector: 'hb-overview',
  template: `
  <div class="container">
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
        <ngx-chartjs type="bar" [data]="data" height="200" [options]="options"></ngx-chartjs>

        <div class="row adsbygoogle">
          <div class="col-12">
            <div class="mt-3 text-center">
              <ng-adsense></ng-adsense>
            </div>
          </div>
        </div>
        <hb-overview-competition></hb-overview-competition>
      </div>
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
  gradient = ['grey', 'lightgreen', 'green'];

  data: any = {};
  options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: { display: false },
          ticks: { beginAtZero: true },
        },
      ],
      xAxes: [
        {
          display: false,
          gridLines: { display: false },
          ticks: { beginAtZero: true },
        },
      ],
    },
    legend: { display: false },
  };

  constructor(private route: ActivatedRoute, private api: Api) {}

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.setup(params['nickname']);
    });
  }
  setup(nickname: string) {
    this.playerError = false;
    this.loading = true;
    this.matches = undefined;
    this.heroes = undefined;
    const data = {
      labels: fill(Array(30), ''),
      datasets: [
        {
          label: 'Plays',
          data: fill(Array(30), 0),
          fill: false,
          backgroundColor: '#999898',
          borderWidth: 1,
        },
      ],
    };
    this.api.getPlayerMatches(nickname).subscribe(
      res => {
        this.matches = res.matches;
        const now = new Date();
        data.datasets[0].data.shift();
        // data.labels = playsByDay.map(n => format(new Date(n.day), 'MM/d'));
        this.matches.forEach(n => {
          const date = new Date(n.date);
          const diff = differenceInDays(date, now);
          if (diff > -30) {
            data.datasets[0].data[29 + diff] += 1;
            data.labels[29 + diff] = format(date, 'MM/dd');
          }
        });
        this.data = data;
      },
      () => (this.playerError = true),
      () => (this.loading = false),
    );
  }
}
