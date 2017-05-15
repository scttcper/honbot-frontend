import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'hb-root',
  template: `
  <div class="text-center">
    <h1>Honbot Project Discontinued</h1>
    <p>HoN api stopped working and this was the source of match stats. Thanks for playing!</p>
    <img src="http://i.imgur.com/8OKwnoL.png" />
  </div>
  <footer class="footer">
    <div class="container text-center">
      <span class="text-muted">
        <a href="https://twitter.com/scttcper">@scttcper</a>
        <br>
        Not affiliated with Frostburn Studios
      </span>
    </div>
  </footer>
  `,
})
export class RipComponent {}

@NgModule({
  declarations: [
    RipComponent,
  ],
  imports: [
    BrowserModule,
  ],
  bootstrap: [RipComponent]
})
export class RipModule { }
