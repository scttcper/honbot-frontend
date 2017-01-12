import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';

@Component({
  selector: 'hb-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  matches: any[] = [];
  nickname = '';

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.nickname = this.route.snapshot.params['nickname'];
    this.api
      .getPlayerSeason(this.nickname)
      .then((res) => this.matches = res)
      .catch((err) => console.log(err));
  }

}
