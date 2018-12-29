import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { AdsenseModule } from 'ng2-adsense';

import { Api } from './api';
import { AppComponent } from './app.component';
import { HeroesModule } from './heroes/heroes.module';
import { HomeComponent } from './home/home.component';
import { MatchModule } from './match/match.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayerModule } from './player/player.module';
import { HbUtility } from './util';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),

    // 3rd party
    NgbCollapseModule,
    Angulartics2Module.forRoot(),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 2930227358,
    }),

    // 1st party
    HbUtility,
    PlayerModule,
    MatchModule,
    HeroesModule,
  ],
  providers: [Api],
  bootstrap: [AppComponent],
})
export class AppModule {}
