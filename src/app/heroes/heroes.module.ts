import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdsenseModule } from 'ng2-adsense';

import { HbUtility } from '../util';
import { HeroesComponent } from './heroes.component';

export const routes: Routes = [
  {
    path: 'hero',
    component: HeroesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    AdsenseModule,

    HbUtility,
  ],
  declarations: [HeroesComponent],
})
export class HeroesModule {}
