import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from '../environments/environment';

@Injectable()
export class Api {
  playerCache = {};
  herostatsCache: Observable<any>;
  private url = environment.backendUrl;

  constructor(private http: Http) { }

  getPlayerMatches(nickname: string): Observable<PlayerMatches> {
    if (!this.playerCache[nickname]) {
      const url = `${this.url}/playerMatches/${nickname}`;
      this.playerCache[nickname] = this.http
        .get(url)
        .map((res) => res.json())
        .catch((err) => {
          console.error(`Player: ${nickname} not found`);
          this.playerCache[nickname] = undefined;
          return Observable.throw(err);
        })
        .publishReplay()
        .refCount()
        ;
    }
    return this.playerCache[nickname];
  }
  getPlayerCompetition(nickname: string) {
    const url = `${this.url}/playerCompetition/${nickname}`;
    return this.http
      .get(url)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getAvatar(accountId: number) {
    const url = `https://hon-avatar.now.sh/${accountId}`;
    return this.http
      .get(url)
      .map((res) => res.text())
      .catch(this.handleError);
  }
  getMatch(matchId: string | number) {
    const url = `${this.url}/match/${matchId}`;
    return this.http
      .get(url)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getPlayerSkill(accountId: number): Observable<PlayerSkill> {
    const url = `${this.url}/playerSkill/${accountId}`;
    return this.http
      .get(url)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getMatchSkill(matchId: string | number) {
    const url = `${this.url}/matchSkill/${matchId}`;
    return this.http
      .get(url)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getTwitchStreams() {
    const url = `${this.url}/twitchStreams`;
    return this.http
      .get(url)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getServerStats() {
    const url = `${this.url}/stats`;
    return this.http
      .get(url)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getHeroStats() {
    if (!this.herostatsCache) {
      const url = `${this.url}/herostats`;
      this.herostatsCache = this.http
        .get(url)
        .map((res) => res.json())
        .publishReplay()
        .refCount()
        ;
    }
    return this.herostatsCache;
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error.text() || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

export interface PlayerSkill {
  _id: number;
  mu: number;
  sigma: number;
  games: number;
}
export interface PlayerCompetition {
  t: number;
  w: number;
  l: number;
  nickname: string;
}
export interface FlatMatch {
  id: number;
  account_id: number;
  nickname: string;
  lowercaseNickname: string;
  clan_id: number;
  hero_id: number;
  position: number;
  items: number[];
  team: number;
  level: number;
  win: boolean;
  concedes: number;
  concedevotes: number;
  buybacks: number;
  discos: number;
  kicked: number;
  mmr_change: string;
  herodmg: number;
  kills: number;
  assists: number;
  deaths: number;
  goldlost2death: number;
  secs_dead: number;
  cs: number;
  bdmg: number;
  razed: number;
  denies: number;
  exp_denied: number;
  consumables: number;
  wards: number;
  bloodlust: number;
  doublekill: number;
  triplekill: number;
  quadkill: number;
  annihilation: number;
  ks3: number;
  ks4: number;
  ks5: number;
  ks6: number;
  ks7: number;
  ks8: number;
  ks9: number;
  ks10: number;
  ks15: number;
  smackdown: number;
  humiliation: number;
  nemesis: number;
  retribution: number;
  used_token: number;
  time_earning_exp: number;
  teamcreepkills: number;
  teamcreepdmg: number;
  teamcreepexp: number;
  teamcreepgold: number;
  neutralcreepkills: number;
  neutralcreepdmg: number;
  neutralcreepexp: number;
  neutralcreepgold: number;
  actions: number;
  gold: number;
  exp: number;
  kdr: number;
  gpm: number;
  xpm: number;
  apm: number;
  matchId: number;
  server_id: number;
  setup_no_repick: number;
  setup_no_agi: number;
  setup_drp_itm: number;
  setup_no_timer: number;
  setup_rev_hs: number;
  setup_no_swap: number;
  setup_no_int: number;
  setup_alt_pick: number;
  setup_veto: number;
  setup_shuf: number;
  setup_no_str: number;
  setup_no_pups: number;
  setup_dup_h: number;
  setup_ap: number;
  setup_br: number;
  setup_em: number;
  setup_cas: number;
  setup_rs: number;
  setup_nl: number;
  setup_officl: number;
  setup_no_stats: number;
  setup_ab: number;
  setup_hardcore: number;
  setup_dev_heroes: number;
  setup_verified_only: number;
  setup_gated: number;
  setup_rapidfire: number;
  date: string;
  length: number;
  version: string;
  map: string;
  type: string;
  mode: string;
}
export interface PlayerMatches {
  wins: number;
  losses: number;
  matches: FlatMatch[];
  account_id: number;
}
