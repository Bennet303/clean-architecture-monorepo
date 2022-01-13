import { TranslatableError } from '../../core/abstracts/translatable.error';

export class InvalidTokenError extends TranslatableError {
  constructor() {
    super('errors.features.auth.invalid_token');
  }
}

export class FailedLoggingInError extends TranslatableError {
  constructor() {
    super('errors.features.auth.failed_logging_in');
  }
}

export class FailedLoggingOutError extends TranslatableError {
  constructor() {
    super('errors.features.auth.failed_logging_out');
  }
}
