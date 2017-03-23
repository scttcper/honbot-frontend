import { Component, OnInit } from '@angular/core';

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

  constructor(private api: Api) { }

  ngOnInit() {
    this.api
      .getHeroStats()
      .subscribe((res) => {
        this.herostatsAvg = res.avg;
        this.sortStats(this.sortMethod);
      }, () => {
      }, () => {
        this.loading = false;
      });
  }
  sortStats(el) {
    if (!this.herostatsAvg) {
      return;
    }
    return this.herostatsAvg.sort((a, b) => b[el] - a[el]);
  }
}
