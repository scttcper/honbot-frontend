import { Component, OnInit, Input } from '@angular/core';

import { Api } from '../api';

@Component({
  selector: 'hb-bracket',
  template: `{{ skill | skillBracket }}`,
})
export class SkillBracketComponent implements OnInit {
  @Input() matchId: number;
  skill = 'Loading...';

  constructor(private api: Api) { }

  ngOnInit() {
    this.api
      .getMatchSkill(this.matchId)
      .subscribe((res) => {
        this.skill = res.averageScore;
      });
  }

}
