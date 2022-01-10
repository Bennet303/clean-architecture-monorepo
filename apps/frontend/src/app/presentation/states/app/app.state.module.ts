import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './app.state';

@NgModule({
  imports: [NgxsModule.forFeature([AppState])],
})
export class AppStateModule {}
