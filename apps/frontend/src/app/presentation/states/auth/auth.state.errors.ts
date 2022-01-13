import { TranslatableError } from '../../../core/abstracts/translatable.error';

export class UnauthorizedError extends TranslatableError {
  constructor() {
    super('errors.states.auth.unauthorized');
  }
}
