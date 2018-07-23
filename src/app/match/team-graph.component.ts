import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'team-graph',
  template: `<ngx-chartjs [data]="data" [options]="options" type="doughnut"></ngx-chartjs>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamGraphComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() legion: number;
  @Input() hellbourne: number;
  data = {
    labels: ['Legion', 'Hellbourne'],
    datasets: [
      {
        label: '',
        data: [0, 0],
        fill: false,
        backgroundColor: ['#92A525', '#C23C2A'],
        borderColor: ['#92A525', '#C23C2A'],
        borderWidth: 1,
      },
    ],
  };
  options = {
    legend: { display: false },
    title: { display: true, text: '', fontColor: '#fff' },
  };
  constructor() {}

  ngOnInit() {
    this.data.datasets[0].label = this.title;
    this.options.title.text = this.title;
  }
  ngOnChanges() {
    const data = {...this.data};
    data.datasets[0].data[0] = this.legion;
    data.datasets[0].data[1] = this.hellbourne;
    this.data = data;
  }
}
