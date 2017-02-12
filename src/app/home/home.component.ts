import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Api } from '../api';

@Component({
  selector: 'hb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search = '';
  match = '';
  twitch: any[];
  constructor(
    private router: Router,
    private api: Api,
  ) { }

  ngOnInit() {
    this.api.getTwitchStreams().subscribe((res) => {
      this.twitch = res;
    });
  }

  goPlayer() {
    this.router.navigate(['/player', this.search]);
  }
  goMatch() {
    this.router.navigate(['/match', this.match]);
  }

}
