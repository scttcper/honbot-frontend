import { Component, OnChanges, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'hb-overview-matches',
  template: `
  <legend class="mt-2">
    Latest Matches
    <small class="float-right mt-3"><a [routerLink]="['matches']">+more</a></small>
  </legend>
  <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>Hero</th>
        <th>Result</th>
        <th>Type</th>
        <th>Duration</th>
        <th>K/D/A</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngIf="matches === undefined" class="text-center">
        <td colspan="5">
          <hb-loading></hb-loading>
        </td>
      </tr>
      <tr *ngFor="let m of matches | slice:0:15">
        <td>
          <img width="45" height="45" alt="hero icon" src="https://www.heroesofnewerth.com/images/heroes/{{m.hero_id}}/icon_128.jpg">
        </td>
        <td>
          <div>
            <a [routerLink]="['/match', m.matchId]">
              <span *ngIf="m.win" class="text-success">Won Match</span>
              <span *ngIf="!m.win" class="text-danger">Lost Match</span>
            </a>
          </div>
          <small>{{ m.date | timeAgo }}</small>
        </td>
        <td>
          <div>{{ m.mode }}</div>
          <small>
            <hb-bracket [mode]="m.mode" [id]="m.matchId">Skill</hb-bracket>
          </small>
        </td>
        <td>
          <div class="pb-1">{{ m.length / 60 | number:'1.0-0' }} Minutes</div>
          <hb-bar [value]="m.length" [max]="maxLength"></hb-bar>
        </td>
        <td>
          <div class="pb-1">{{ m.kills }}/{{ m.deaths }}/{{ m.assists }}</div>
          <div class="bar">
            <div class="segment kills" [style.width.%]="m.kills / (m.kills + m.assists + m.deaths) * 100"></div>
            <div class="segment deaths" [style.width.%]="m.deaths / (m.kills + m.assists + m.deaths) * 100"></div>
            <div class="segment assists" [style.width.%]="m.assists / (m.kills + m.assists + m.deaths) * 100"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    .table-sm > td {
      line-height: 1.3;
      padding-top: 0.25rem
    }
    tr > td:first-child {
      padding: 0;
    }
  `],
})
export class OverviewMatchesComponent implements OnChanges {
  @Input() matches: any;
  maxLength = 0;
  constructor() { }

  ngOnChanges() {
    const max = _.maxBy<any>(this.matches, _.property('length'));
    this.maxLength = max ? max.length : 0;
  }

}
