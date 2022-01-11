import { TranslatableError } from '../../../../../core/translatable.error';

export class NoUserInStateError extends TranslatableError {
  constructor() {
    super('errors.states.home.no_user_found');
  }
}
