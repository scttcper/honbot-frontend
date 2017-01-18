import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../environments/environment';

@Injectable()
export class Api {
  private url: string = environment.backendUrl;

  constructor(private http: Http) { }

  getPlayerSeason(nickname: string): Promise<any[]> {
    const url = `${this.url}/season/${nickname}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .toPromise();
  }
  getPlayerMatches(nickname: string): Promise<any[]> {
    const url = `${this.url}/playerMatches/${nickname}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .toPromise();
  }
  getAvatar(accountId: number): Promise<string> {
    const url = `https://hon-avatar.now.sh/${accountId}`;
    return this.http
      .get(url)
      .map(res => res.text())
      .toPromise();
  }
}
