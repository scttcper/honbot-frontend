import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../../api';

@Component({
  selector: 'hb-overview-competition',
  template: `
  <legend class="mt-2">
    Friends
    <small class="mt-3">30 days</small>
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
        <th scope="row"><a [routerLink]="['/player', p.nickname]">{{ p.nickname }}</a></th>
        <td>{{ p.t }}</td>
        <td>{{ p.w / p.t * 100 | number:'1.1-1' }}%</td>
      </tr>
    </tbody>
  </table>
  <legend class="mt-2">
    Opponents
    <small class="mt-3">30 days</small>
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
        <th scope="row"><a [routerLink]="['/player', p.nickname]">{{ p.nickname }}</a></th>
        <td>{{ p.t }}</td>
        <td>{{ p.w / p.t * 100 | number:'1.1-1' }}%</td>
      </tr>
    </tbody>
  </table>
  `,
})
export class OverviewCompetitionComponent implements OnInit {
  loading = true;
  with: any[];
  against: any[];

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.loading = true;
      this.with = undefined;
      this.api
        .getPlayerCompetition(params['nickname'])
        .subscribe(
          (res) => {
            this.with = res.with;
            this.against = res.against;
          },
          () => {},
          () => this.loading = false,
        );
    });
  }

}
