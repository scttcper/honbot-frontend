import { Component, Input, OnInit } from '@angular/core';

import { Api } from '../api';
import { isRanked } from '../util';

@Component({
  selector: 'hb-bracket',
  template: `
    {{ skill | skillBracket }}
    <ng-content *ngIf="skill"></ng-content>
  `,
})
export class SkillBracketComponent implements OnInit {
  @Input() mode: string;
  @Input() id: number;
  skill = 'Loading...';

  constructor(private api: Api) { }

  ngOnInit() {
    if (!isRanked(this.mode)) {
      this.skill = '';
      return;
    }
    this.api
      .getMatchSkill(this.id)
      .subscribe(r => this.skill = r.averageScore);
  }

}
