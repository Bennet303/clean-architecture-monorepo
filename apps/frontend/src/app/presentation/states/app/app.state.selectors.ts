import { Selector } from '@ngxs/store';
import { AppState } from './app.state';
import { AppStateModel } from './app.state.model';

export abstract class AppStateSelectors {
  @Selector([AppState])
  static stateModel(stateModel: AppStateModel) {
    return stateModel;
  }
}
