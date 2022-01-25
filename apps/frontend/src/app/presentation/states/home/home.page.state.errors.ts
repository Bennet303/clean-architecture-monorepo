import { TranslatableError } from '../../../core/abstracts/errors';

export class NoUserInStateError extends TranslatableError {
  constructor() {
    super('errors.states.home.no_user_found');
  }
}
