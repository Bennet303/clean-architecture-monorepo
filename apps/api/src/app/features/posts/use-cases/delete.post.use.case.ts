import {
  AuthenticatedParam,
  FindOnePostParam,
} from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { InsufficientPermissionsError } from '../../auth/auth.errors';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class DeletePostUseCase
  implements UseCase<AuthenticatedParam<FindOnePostParam>, void>
{
  constructor(private readonly repository: PostsRepository) {}

  async execute(
    param: AuthenticatedParam<FindOnePostParam>
  ): Promise<void | PostNotFoundError | InsufficientPermissionsError | Error> {
    const ability = param.user.ability;
    const findOnePostParam = param.data;

    const postOrError = await this.repository.getPost(findOnePostParam);

    if (postOrError instanceof Error) return postOrError;

    if (!ability || !ability.can(Action.Delete, postOrError))
      return new InsufficientPermissionsError();

    return this.repository.deletePost(findOnePostParam);
  }
}
