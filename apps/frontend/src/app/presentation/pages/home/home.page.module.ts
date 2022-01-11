import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePageStateModule } from '../../states/home/home.page.state.module';
import { UserCardComponentModule } from './components/user-card/user.card.component.module';
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
    UserCardComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
