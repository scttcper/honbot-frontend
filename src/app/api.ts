import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

@Injectable()
export class Api {
  private url: string = environment.backendUrl;

  constructor(private http: Http) { }

  getPlayerSeason(nickname: string) {
    const url = `${this.url}/season/${nickname}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getPlayerMatches(nickname: string) {
    const url = `${this.url}/playerMatches/${nickname}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getAvatar(accountId: number) {
    const url = `https://hon-avatar.now.sh/${accountId}`;
    return this.http
      .get(url)
      .map(res => res.text())
      .catch(this.handleError);
  }
  getMatch(matchId: string | number) {
    const url = `${this.url}/match/${matchId}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getMatchSkill(matchId: string | number) {
    const url = `${this.url}/matchSkill/${matchId}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .catch(this.handleError);
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
