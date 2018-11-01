import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'hb-root',
  template: `
  <hb-navbar></hb-navbar>
  <router-outlet></router-outlet>
  <footer class="footer">
    <div class="container text-center">
      <span class="text-muted">
        Created by <a href="https://twitter.com/scttcper">@scttcper</a>
        <br>
        Not affiliated with Frostburn Studios
      </span>
    </div>
  </footer>
  `,
})
export class AppComponent {
  constructor(googleAnalytics: Angulartics2GoogleAnalytics) {
    googleAnalytics.startTracking();
  }
}
