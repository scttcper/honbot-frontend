import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Api } from '../api';

@Component({
  selector: 'hb-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  loading = true;
  herostatsAvg: any[];
  sortMethod = 'wr';
  prMax = 0;
  wrMax = 0;

  constructor(private api: Api) { }

  ngOnInit() {
    this.api
      .getHeroStats()
      .subscribe((res) => {
        this.herostatsAvg = res.avg;
        const prMax = _.maxBy(this.herostatsAvg, _.property('pr'));
        this.prMax = prMax.pr;
        const wrMax = _.maxBy(this.herostatsAvg, _.property('wr'));
        this.wrMax = wrMax.wr;
        this.sortStats();
      }, () => {
      }, () => {
        this.loading = false;
      });
  }
  sortStats(el = this.sortMethod) {
    if (!this.herostatsAvg) {
      return;
    }
    this.herostatsAvg.sort((a, b) => b[el] - a[el]);
    this.sortMethod = el;
  }
}
