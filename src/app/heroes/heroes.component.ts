import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import maxBy = require('lodash/maxBy');
import property = require('lodash/property');

import { Api } from '../api';

@Component({
  selector: 'hb-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  loading = true;
  herostatsAvg: any[] = [];
  herostatsWeek: any[] = [];
  sortMethod = 'wr';
  prMax = 0;
  wrMax = 0;

  constructor(private api: Api, title: Title) {
    title.setTitle('honbot - Hero Stats');
  }

  ngOnInit() {
    this.api
      .getHeroStats()
      .subscribe((res) => {
        this.herostatsAvg = res.avg;
        this.loading = false;
        if (!this.herostatsAvg.length) {
          return;
        }
        const prMax = maxBy(this.herostatsAvg, property('pr'));
        this.prMax = prMax.pr;
        const wrMax = maxBy(this.herostatsAvg, property('wr'));
        this.wrMax = wrMax.wr;
        this.herostatsWeek = res.week;
        this.sortStats();
      }, () => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }
  sortStats(el = this.sortMethod) {
    this.herostatsAvg.sort((a, b) => b[el] - a[el]);
    this.sortMethod = el;
  }
}
