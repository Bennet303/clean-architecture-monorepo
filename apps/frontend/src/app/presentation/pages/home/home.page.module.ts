import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '@clean-architecture-monorepo/shared-components';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { HomePageStateModule } from '../../states/home/home.page.state.module';
import { HeaderComponentModule } from './components/header/header.component.module';
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
    SharedComponentsModule,
    HeaderComponentModule,
    TranslocoModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
