import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { Api } from './api';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PlayerModule } from './player/player.module';
import { MatchComponent } from './match/match.component';
import { BackComponent } from './back/back.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'match/:matchId', component: MatchComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MatchComponent,
    BackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 2930227358,
    }),
    PlayerModule,
  ],
  providers: [Api],
  bootstrap: [AppComponent]
})
export class AppModule { }
