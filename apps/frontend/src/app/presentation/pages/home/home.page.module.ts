import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from '../../../transloco-root.module';
import { HomePageStateModule } from '../../states/home/home.page.state.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
    HomePageStateModule,
    TranslocoRootModule,
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'home' }],
  declarations: [HomePage],
})
export class HomePageModule {}
