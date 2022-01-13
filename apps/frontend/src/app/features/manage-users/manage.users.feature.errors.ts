import { TranslatableError } from '../../core/abstracts/translatable.error';

export class FailedCreatingUserError extends TranslatableError {
  constructor() {
    super('errors.features.manage_users.failed_creating_user');
  }
}

export class FailedDeletingUserError extends TranslatableError {
  constructor() {
    super('errors.features.manage_users.failed_deleting_user');
  }
}

export class FailedGettingUserError extends TranslatableError {
  constructor() {
    super('errors.features.manage_users.failed_getting_user');
  }
}

export class InvalidUserError extends TranslatableError {
  constructor() {
    super('errors.features.manage_users.invalid_user');
  }
}
