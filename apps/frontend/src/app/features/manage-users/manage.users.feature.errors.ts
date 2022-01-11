import { CustomError } from '../../../../core/custom.error';

export class FailedCreatingUserError extends CustomError {
  constructor() {
    super('errors.features.manage_users.failed_creating_user');
  }
}

export class FailedDeletingUserError extends CustomError {
  constructor() {
    super('errors.features.manage_users.failed_deleting_user');
  }
}

export class FailedGettingUserError extends CustomError {
  constructor() {
    super('errors.features.manage_users.failed_getting_user');
  }
}

export class InvalidUserError extends CustomError {
  constructor() {
    super('errors.features.manage_users.invalid_user');
  }
}
