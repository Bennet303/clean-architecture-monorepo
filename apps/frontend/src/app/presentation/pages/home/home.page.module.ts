import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePageStateModule } from '../../states/home/home.page.state.module';
import { HomePage } from './home.page';
import { SharedComponentsModule } from '@clean-architecture-monorepo/shared-components';
import { HeaderComponentModule } from './components/header/header.component.module';

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
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
