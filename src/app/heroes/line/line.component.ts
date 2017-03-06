import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';

// import {
//   D3Service,
//   D3,
//   Axis,
//   BrushBehavior,
//   BrushSelection,
//   D3BrushEvent,
//   ScaleLinear,
//   ScaleOrdinal,
//   Selection,
//   Transition,
// } from 'd3-ng2-service';

import * as d3 from 'd3';


const gen = n => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push({
      time: new Date(Date.now() - (i * 3600000)),
      value: Math.max(250, Math.random() * 3000 | 0)
    });
  }

  return data;
};

@Component({
  selector: 'hb-line',
  styles: [`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 50px 0 0 0;
    font: 15px/1.6 Helvetica, Arial, sans-serif;
  }

  section {
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 75px;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 0 0 15px 0;
  }

  #actions {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #eee;
    height: 50px;
    padding: 0 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: white;
  }

  .chart {
    /*border: 1px dotted #ddd;*/
  }

  .chart .column {
    fill: white;
  }

  .chart .line {
    stroke: white;
    stroke-width: 3px;
    fill: none;
  }

  .chart .axis text {
    font: 9px sans-serif;
  }

  .chart .axis path,
  .chart .axis line {
    fill: none;
    stroke: white;
    stroke-width: 1.5px;
    shape-rendering: crispEdges;
  }

  .chart .axis path {
    display: none;
  }
  `],
  template: `
    <div class="chart">
      <svg>
        <g>
          <path class="line"></path>
          <g class="x axis"></g>
          <g class="y axis"></g>
        </g>
      </svg>
    </div>
    <div></div>
  `
})
export class LineComponent implements OnInit, OnDestroy {
  @Input() stats: any;
  private el: any;
  a: any;
  // private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  constructor(private element: ElementRef) {
    this.el = element.nativeElement;
  }

  ngOnInit() {
    this.a = new LineChart({
      target: d3.select(this.el).select('svg'),
      width: this.el.parentElement.offsetWidth,
      height: 200,
    });

    // this.b = new Chart({
    //   target: this.refs.b,
    //   width: 250,
    //   height: 100,
    //   xTicks: 3,
    //   yTicks: 3
    // })
    //
    console.log(this.stats)

    this.a.render(this.stats);
    // this.b.render(gen(8));

  }

  ngOnDestroy() {

  }

}


/**
 * LineChart.
 */

class LineChart {
  // target element or selector to contain the svg
  target: any;

  // width of chart
  width = 550;

  // height of chart
  height = 150;

  // margin
  margin = { top: 15, right: 25, bottom: 25, left: 45 };

  // axis padding
  axisPadding = 5;

  // axis tick size
  tickSize = 0;

  // number of x-axis ticks
  xTicks = 5;

  // number of y-axis ticks
  yTicks = 3;

  // nice round values for axis
  nice = false;
  chart: any;
  x: any;
  y: any;
  xAxis: any;
  yAxis: any;
  line: any;
  value: any;

  // line interpolation
  interpolate = 'curveBasis';

  /**
   * Construct with the given `config`.
   */

  constructor(config) {
    this.set(config);
    this.init();
  }

  /**
   * Set configuration options.
   */

  set(config) {
    Object.assign(this, config);
  }

  /**
   * Dimensions without margin.
   */

  dimensions() {
    const { width, height, margin } = this;
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
    return [w, h];
  }

  /**
   * Initialize the chart.
   */

  init() {
    const { target, width, height, margin, axisPadding, interpolate } = this;
    const { tickSize, xTicks, yTicks } = this;
    const [w, h] = this.dimensions();

    this.chart = target
        .attr('width', width)
        .attr('height', height)
      .select('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.x = d3.scaleTime()
      .range([0, w]);

    this.y = d3.scaleLinear()
      .range([h, 0]);

    this.xAxis = d3.axisBottom(this.x)
      .ticks(xTicks)
      .tickPadding(8)
      .tickSize(tickSize);

    this.yAxis = d3.axisLeft(this.y)
      .ticks(yTicks)
      .tickPadding(8)
      .tickSize(tickSize);

    this.chart.select('.x')
      .attr('transform', `translate(0, ${h + axisPadding})`)
      .call(this.xAxis);

    this.chart.select('.y')
      .attr('transform', `translate(${-axisPadding}, 0)`)
      .call(this.yAxis);

    this.line = d3.line()
      .x((d: any) => this.x(new Date(d.date)))
      .y((d: any) => this.y(d.percent))
      .curve(d3[interpolate]);
  }

  /**
   * Render axis.
   */

  renderAxis(data, options) {
    const { chart, x, y, xAxis, yAxis, nice } = this;

    const xd = x.domain(d3.extent(data, (d: any) => new Date(d.date)));
    const yd = y.domain([0.3, 0.7]);

    if (nice) {
      xd.nice();
      yd.nice();
    }

    const c = options.animate
      ? chart.transition()
      : chart;

    c.select('.x.axis').call(xAxis);
    c.select('.y.axis').call(yAxis);
  }

  /**
   * Render columns.
   */

  renderCols(data) {
    const { chart, x, y } = this;
    const [w, h] = this.dimensions();

    const column = chart.selectAll('.column')
      .data(data);

    // enter
    column.enter().append('rect')
      .attr('class', 'column');

    // update
    column.attr('width', 1)
      .attr('height', d => h)
      .attr('x', d => x(d.date))
      .attr('y', 0);

    // exit
    column.exit()
      .remove();
  }

  /**
   * Render line.
   */

  renderLine(data) {
    const chart = this.chart.transition();
    const { line } = this;

    chart.select('.line')
      .attr('d', line(data));

    // hack: fixes order
    chart.node().appendChild(chart.select('.line').node());
  }

  /**
   * Render the chart against the given `data`.
   */

  render(data, options = {}) {
    this.renderAxis(data, options);
    this.renderCols(data);
    this.renderLine(data);
  }

  /**
   * Update the chart against the given `data`.
   */

  update(data) {
    this.render(data, {
      animate: true
    });
  }
}
