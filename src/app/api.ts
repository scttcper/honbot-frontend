import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from '../environments/environment';

@Injectable()
export class Api {
  private url: string = environment.backendUrl;
  playerCache = {};
  herostatsCache: Observable<any>;

  constructor(private http: Http) { }

  getPlayerMatches(nickname: string) {
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
  getPlayerSkill(accountId: number): Observable<playerSkill> {
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

interface playerSkill {
  _id: number;
  mu: number;
  sigma: number;
  games: number;
}
