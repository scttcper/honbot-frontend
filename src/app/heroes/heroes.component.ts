import { Component, OnInit } from '@angular/core';

import { Api } from '../api';

@Component({
  selector: 'hb-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  herostatsAvg: any[] = [];
  loading = true;

  constructor(private api: Api) { }

  ngOnInit() {
    this.api
      .getHeroStats()
      .subscribe((res) => {
        this.herostatsAvg = res;
      }, () => {
        return;
      }, () => {
        this.loading = false;
      });
  }

}
