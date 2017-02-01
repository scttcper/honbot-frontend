import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Api } from '../../api';

@Component({
  selector: 'hb-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  loading = true;
  matches: any[];

  constructor(
    private route: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.api
        .getPlayerMatches(params['nickname'])
        .subscribe((res) => {
          this.loading = false;
          this.matches = res.matches;
        });
    });
  }

}
