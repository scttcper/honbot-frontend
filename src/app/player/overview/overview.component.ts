import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Api } from '../../api';

const needsSum = [
  'win',
  'loss',
  'kills',
  'deaths',
  'assists',
  'gpm',
];

@Component({
  selector: 'hb-overview',
  template: `
  <div class="row" *ngIf="!playerError">
    <div class="col-lg-8">
      <hb-overview-heroes [matches]="matches"></hb-overview-heroes>
      <hb-overview-matches [matches]="matches"></hb-overview-matches>
    </div>
    <div class="col-lg-4">
      <div class="row adsbygoogle">
        <div class="col">
          <div class="mt-3 text-center">
            <ng2-adsense></ng2-adsense>
          </div>
        </div>
      </div>

      <legend class="mt-2">
        Friends
        <small class="mt-3">This Week</small>
      </legend>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Friend</th>
            <th>Matches</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" *ngIf="loading">
            <td colspan="3">
              <hb-loading></hb-loading>
            </td>
          </tr>
          <tr class="text-center" *ngIf="with && with.length === 0">
            <td colspan="3">None</td>
          </tr>
          <tr *ngFor="let p of with | slice:0:8">
            <th scope="row"><a [routerLink]="['/player', p.nickname]">{{p.nickname}}</a></th>
            <td>{{p.t}}</td>
            <td>{{p.w / p.t * 100 | number:'1.1-1'}}%</td>
          </tr>
        </tbody>
      </table>
      <legend class="mt-2">
        Opponents
        <small class="mt-3">This Week</small>
      </legend>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Player</th>
            <th>Matches</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" *ngIf="loading">
            <td colspan="3">
              <hb-loading></hb-loading>
            </td>
          </tr>
          <tr class="text-center" *ngIf="against && against.length === 0">
            <td colspan="3">None</td>
          </tr>
          <tr *ngFor="let p of against | slice:0:8">
            <th scope="row"><a [routerLink]="['/player', p.nickname]">{{p.nickname}}</a></th>
            <td>{{p.t}}</td>
            <td>{{p.w / p.t * 100 | number:'1.1-1'}}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
})
export class OverviewComponent implements OnInit {
  loading = true;
  matches: any[];
  with: any[];
  against: any[];
  heroes: any[];
  maxHeroes: any = {};
  playerError = false;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.playerError = false;
      this.loading = true;
      this.matches = undefined;
      this.with = undefined;
      this.against = undefined;
      this.heroes = undefined;
      this.api
        .getPlayerMatches(params['nickname'])
        .subscribe((res) => {
          this.loading = false;
          this.matches = res.matches;
        }, () => {
          this.playerError = true;
        });
      this.api
        .getPlayerCompetition(params['nickname'])
        .subscribe((res) => {
          this.with = res.with;
          this.against = res.against;
        })
    });
  }

}
