import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

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
  lastMatch;
  wins = 0;
  losses = 0;
  winPercent = 0;
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
      for (const n of m.players) {
        if (n.lowercaseNickname === this.lowercaseNickname) {
          this.wins += n.win ? 1 : 0;
          this.losses += n.win ? 0 : 1;
          n.match_id = m.match_id;
          n.server_id = m.server_id;
          n.setup = m.setup;
          n.date = m.date;
          n.length = m.length;
          n.version = m.version;
          n.c_state = m.c_state;
          n.map = m.map;
          this.playerMatches.push(n);
          return;
        }
      }
    });
    if (!this.playerMatches.length) {
      return;
    }
    this.winPercent = Math.round((this.wins / this.playerMatches.length) * 10000) / 100;
    this.lastMatch = moment(this.playerMatches[0].date).fromNow();
    this.api
      .getAvatar(this.playerMatches[0].account_id)
      .then((res) => this.avatar = res);
  }

}
