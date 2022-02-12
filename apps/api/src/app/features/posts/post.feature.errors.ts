export class PostNotFoundError extends Error {
  constructor() {
    super('Post not found');
  }
}

export class PostAlreadyExistsError extends Error {
  constructor() {
    super('Post already exists');
  }
}

export class MultiplePostsFoundError extends Error {
  constructor() {
    super('Multiple posts found');
  }
}
