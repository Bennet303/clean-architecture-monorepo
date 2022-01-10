import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { AppStateModel, defaultAppStateModel } from './app.state.model';

@State<AppStateModel>({
  name: 'app',
  defaults: defaultAppStateModel,
})
@Injectable()
export class AppState {}
