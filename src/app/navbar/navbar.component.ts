import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-navbar',
  template: `
  <nav class="navbar navbar-expand navbar-inverse bg-lighter">
    <div class="container">
      <a class="navbar-brand pl-sm-3" routerLink="/">honbot</a>
      <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
        <form class="form-inline my-0" (ngSubmit)="onSubmit()">
          <input [(ngModel)]="search" name="search" class="form-control mr-sm-2" type="text" placeholder="Username">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isCollapsed = false;
  search = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/player', this.search]);
    this.search = '';
  }
}
