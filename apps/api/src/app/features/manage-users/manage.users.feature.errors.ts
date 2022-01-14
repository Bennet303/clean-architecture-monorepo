export class InvalidInputError extends Error {}

export class UserAlreadyExistsError extends Error {}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found.');
  }
}
