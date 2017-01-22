import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-root',
  template: `
  <hb-navbar></hb-navbar>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}
