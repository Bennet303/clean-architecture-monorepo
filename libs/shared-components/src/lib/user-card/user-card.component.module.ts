import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [UserCardComponent],
})
export class UserCardComponentModule {}
