export class TranslatableError extends Error {
  private readonly isOfTypeTranslatableError? = true;

  constructor(message?: string) {
    super(message || 'errors.core.common');
  }
}

export class TimeoutError extends TranslatableError {
  constructor() {
    super('errors.core.timeout');
  }
}
