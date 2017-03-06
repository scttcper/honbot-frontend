import { Component, OnInit } from '@angular/core';

import { Api } from '../api';

@Component({
  selector: 'hb-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  herostats: any;
  loading = true;

  constructor(private api: Api) { }

  ngOnInit() {
    this.api
      .getHeroStats()
      .subscribe((res) => {
        this.loading = false;
        this.herostats = res;
      });
  }

}
