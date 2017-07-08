import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'hb-root',
  template: `
  <hb-navbar></hb-navbar>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  <footer class="footer">
    <div class="container text-center">
      <span class="text-muted">
        Created by <a href="https://twitter.com/scttcper">@scttcper</a> -
        <a href="https://github.com/scttcper/honbot-frontend">Frontend</a> +
        <a href="https://github.com/scttcper/honbot-api">Backend</a>
        <br>
        Not affiliated with Frostburn Studios
      </span>
    </div>
  </footer>
  `,
})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}
