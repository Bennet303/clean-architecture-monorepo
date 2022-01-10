import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  HomePageCreateUserAction,
  HomePageDeleteUserAction,
  HomePageGetUserAction,
} from '../../states/home/home.page.state.actions';
import { HomePageStateModel } from '../../states/home/home.page.state.model';
import { HomePageStateSelectors } from '../../states/home/home.page.state.selectors';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  @Select(HomePageStateSelectors.stateModel)
  stateModel$!: Observable<HomePageStateModel>;

  constructor(private readonly store: Store) {}

  createUser() {
    this.store.dispatch(new HomePageCreateUserAction({ id: '1' }));
  }

  deleteUser() {
    this.store.dispatch(new HomePageDeleteUserAction());
  }

  getUser() {
    this.store.dispatch(new HomePageGetUserAction());
  }
}
