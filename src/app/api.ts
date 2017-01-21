import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../environments/environment';

@Injectable()
export class Api {
  private url: string = environment.backendUrl;

  constructor(private http: Http) { }

  getPlayerSeason(nickname: string) {
    const url = `${this.url}/season/${nickname}`;
    return this.http
      .get(url)
      .map(res => res.json());
  }
  getPlayerMatches(nickname: string) {
    const url = `${this.url}/playerMatches/${nickname}`;
    return this.http
      .get(url)
      .map(res => res.json());
  }
  getAvatar(accountId: number) {
    const url = `https://hon-avatar.now.sh/${accountId}`;
    return this.http
      .get(url)
      .map(res => res.text());
  }
  getMatch(matchId: string | number) {
    const url = `${this.url}/match/${matchId}`;
    return this.http
      .get(url)
      .map(res => res.json());
  }
}
