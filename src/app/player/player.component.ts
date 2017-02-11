import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Api } from '../api';

const DEFAULT_AVATAR = 'https://s3.amazonaws.com/naeu-icb2/icons/default/account/default.png';

@Component({
  selector: 'hb-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  lastMatch: string;
  wins = 0;
  losses = 0;
  winPercent = 0;
  loading = false;
  nickname = '';
  avatar = DEFAULT_AVATAR;
  playerError = false;

  maxLength: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.playerError = false;
      this.wins = 0;
      this.losses = 0;
      this.winPercent = 0;
      this.loading = true;
      this.lastMatch = null;
      this.avatar = DEFAULT_AVATAR;
      this.nickname = params['nickname'];
      this.api
        .getPlayerMatches(this.nickname)
        .subscribe((res) => {
          this.loading = false;
          if (!res.matches) {
            this.playerError = true;
            return;
          }
          this.wins = res.wins;
          this.losses = res.losses;
          this.winPercent = Math.round((res.wins / (res.wins + res.losses)) * 10000) / 100;
          this.lastMatch = res.matches[0].date;
          this.api
            .getAvatar(res.matches[0].account_id)
            .subscribe((a) => this.avatar = a);
        },
        () => {
          this.playerError = true;
        });
    });
  }
}
