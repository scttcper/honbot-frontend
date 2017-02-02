import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../api';

const DEFAULT_AVATAR = 'https://s3.amazonaws.com/naeu-icb2/icons/default/account/default.png';

@Component({
  selector: 'hb-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  matches: any[] = [];
  playerMatches: any[] = [];
  latestMatches: any[] = [];
  lastMatch;
  wins = 0;
  losses = 0;
  winPercent = 0;
  loading = false;
  nickname = '';
  lowercaseNickname = '';
  avatar = DEFAULT_AVATAR;
  error: any;

  maxLength: number;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.matches = [];
      this.latestMatches = [];
      this.playerMatches = [];
      this.wins = 0;
      this.losses = 0;
      this.winPercent = 0;
      this.loading = true;
      this.lastMatch = null;
      this.avatar = DEFAULT_AVATAR;
      this.nickname = params['nickname'];
      this.lowercaseNickname = params['nickname'].toLowerCase();
      this.api
        .getPlayerMatches(this.nickname)
        .subscribe((res) => {
          this.loading = false;
          this.wins = res.wins;
          this.losses = res.losses;
          this.winPercent = Math.round((res.wins / (res.wins + res.losses)) * 10000) / 100;
          this.lastMatch = res.matches[0].date;
          this.api
            .getAvatar(res.matches[0].account_id)
            .subscribe((a) => this.avatar = a);
        });
    });
  }
}
