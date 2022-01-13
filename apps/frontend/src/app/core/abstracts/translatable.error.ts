export class TranslatableError extends Error {
  private readonly isOfTypeTranslatableError? = true;

  constructor(message?: string) {
    super(message || 'errors.common');
  }
}
