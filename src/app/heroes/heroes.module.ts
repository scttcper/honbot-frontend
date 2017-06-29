import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdsenseModule } from 'ng2-adsense';

import { HeroesComponent } from './heroes.component';
import { HbUtility } from '../util';

export const routes: Routes = [{
  path: 'hero',
  component: HeroesComponent,
}];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    AdsenseModule,

    HbUtility,
  ],
  declarations: [
    HeroesComponent,
  ],
})
export class HeroesModule { }
