export abstract class TranslatableError extends Error {
  constructor(message?: string) {
    super(message || 'errors.common');
  }
}
