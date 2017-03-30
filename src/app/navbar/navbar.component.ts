import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-navbar',
  template: `
  <nav class="navbar navbar-toggleable-xl navbar-inverse bg-lighter">
    <button class="navbar-toggler navbar-toggler-right" (click)="isCollapsed = !isCollapsed">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container">
      <a class="navbar-brand" routerLink="/"><span>honbot</span></a>

      <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
        <form class="form-inline my-0" (ngSubmit)="onSubmit()">
          <input [(ngModel)]="search" name="search" class="form-control mr-sm-2" type="text" placeholder="nickname">
          <button style="position: absolute;top: -1000px;" type="submit">Go</button>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" routerLink="/hero">heroes</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  styles: [`
  @media (min-width: 768px) {
    .container {
      width: 675px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
  `]
})
export class NavbarComponent {
  isCollapsed = false;
  search = '';

  constructor(private router: Router) { }

  onSubmit() {
    this.router.navigate(['player', this.search]);
    this.search = '';
  }

}
