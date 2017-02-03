import { Component, OnInit, Input } from '@angular/core';

import { isRanked } from '../util';
import { Api } from '../api';

@Component({
  selector: 'hb-bracket',
  template: `{{ skill | skillBracket }}`,
})
export class SkillBracketComponent implements OnInit {
  @Input() match: any;
  skill = 'Loading...';

  constructor(private api: Api) { }

  ngOnInit() {
    if (!isRanked(this.match)) {
      this.skill = '';
      return;
    }
    this.api
      .getMatchSkill(this.match.match_id)
      .subscribe((res) => {
        this.skill = res.averageScore;
      });
  }

}
