import { TranslatableError } from '../../../core/abstracts/errors';

export class UnauthorizedError extends TranslatableError {
  constructor() {
    super('errors.states.auth.unauthorized');
  }
}
