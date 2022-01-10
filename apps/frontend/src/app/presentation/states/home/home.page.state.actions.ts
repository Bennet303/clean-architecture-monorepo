import { UserEntity } from '../../../features/manage-users/entities/user.entity';

export class HomePageCreateUserAction {
  static readonly type = '[HOME] create user action';
  constructor(public readonly user: UserEntity) {}
}
export class HomePageDeleteUserAction {
  static readonly type = '[HOME] delete user action';
  constructor() {}
}
export class HomePageGetUserAction {
  static readonly type = '[HOME] get user action';
}
