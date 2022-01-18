import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class DeletePostUseCase implements UseCase<FindOnePostParam, void> {
  constructor(private readonly repository: PostsRepository) {}

  execute(param: FindOnePostParam): Promise<void | PostNotFoundError | Error> {
    return this.repository.deletePost(param);
  }
}
