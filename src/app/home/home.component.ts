import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Api } from '../api';

@Component({
  selector: 'hb-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  search = '';
  match = '';
  twitch: any[];
  recent: any[];
  matches: any;
  loadedLastDay: any;
  constructor(
    private router: Router,
    private api: Api,
    title: Title,
  ) {
    title.setTitle('honbot - Heroes of Newerth Player Stats');
  }

  ngOnInit() {
    this.api.getServerStats().subscribe((res) => {
      this.matches = (res.matches / 1000000).toFixed(2);
      this.loadedLastDay = res.loadedLastDay;
    });
    this.api.getTwitchStreams().subscribe((res) => {
      this.twitch = res;
    });
    this.api.getLatestMatches().subscribe((res) => {
      this.recent = res;
    });
  }

  goPlayer() {
    this.router.navigate(['/player', this.search]);
  }

  goMatch() {
    this.router.navigate(['/match', this.match]);
  }

}
