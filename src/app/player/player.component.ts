import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Api } from '../api';

const DEFAULT_AVATAR = 'https://s3.amazonaws.com/naeu-icb2/icons/default/account/default.png';

@Component({
  selector: 'hb-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  matches: any[] = [];
  playerMatches: any[] = [];
  loadingMatches = false;
  nickname = '';
  lowercaseNickname = '';
  avatar = DEFAULT_AVATAR;
  error: any;

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.matches = [];
      this.loadingMatches = true;
      this.avatar = DEFAULT_AVATAR;
      this.nickname = params['nickname'];
      this.lowercaseNickname = params['nickname'].toLowerCase();
      this.api
        .getPlayerSeason(this.nickname)
        .then((res: any[]) => this.useMatches(res))
        .catch((err) => this.error = err);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  useMatches(matches: any[]) {
    this.matches = matches;
    this.matches.forEach((m) => {
      m.players.forEach((n) => {
        if (n.lowercaseNickname === this.lowercaseNickname) {
          this.playerMatches.push(n);
        }
      });
    });
    if (!this.playerMatches.length) {
      return;
    }
    this.api
      .getAvatar(this.playerMatches[0].account_id)
      .then((res) => this.avatar = res);
  }

}
