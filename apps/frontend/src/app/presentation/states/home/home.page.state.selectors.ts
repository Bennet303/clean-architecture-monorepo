import { Selector } from '@ngxs/store';
import { HomePageState } from './home.page.state';
import { HomePageStateModel } from './home.page.state.model';

export abstract class HomePageStateSelectors {
  @Selector([HomePageState])
  static stateModel(stateModel: HomePageStateModel) {
    return stateModel;
  }
}
