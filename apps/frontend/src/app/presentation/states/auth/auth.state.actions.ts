import { TranslatableError } from '../../../core/abstracts/translatable.error';

export class AuthStateLoginAction {
  static readonly type = '[AUTH] login action';
}

export class AuthStateLogoutAction {
  static readonly type = '[AUTH] logout action';
  constructor(public readonly error?: TranslatableError) {}
}
