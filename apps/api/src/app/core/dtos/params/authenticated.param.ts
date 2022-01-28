import { ApiUser } from '../../auth/api.user';

export class AuthenticatedParam<T> {
  constructor(public readonly user: ApiUser, public readonly data: T) {}
}
