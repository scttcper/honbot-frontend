import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search = '';
  match = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goPlayer() {
    this.router.navigate(['/player', this.search]);
  }
  goMatch() {
    this.router.navigate(['/match', this.match]);
  }

}
