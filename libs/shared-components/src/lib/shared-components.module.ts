import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserCardComponentModule } from './user-card/user-card.component.module';

@NgModule({
  imports: [CommonModule, IonicModule, UserCardComponentModule],
  exports: [UserCardComponentModule],
})
export class SharedComponentsModule {}
