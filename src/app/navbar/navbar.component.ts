import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  search = '';
  constructor(private router: Router) { }

  onSubmit() {
    this.router.navigate(['player', this.search]);
    this.search = '';
  }

}
