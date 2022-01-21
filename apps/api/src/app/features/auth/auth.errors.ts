export class InsufficientPermissionsError extends Error {
  constructor() {
    super('Insufficient permissions');
  }
}
