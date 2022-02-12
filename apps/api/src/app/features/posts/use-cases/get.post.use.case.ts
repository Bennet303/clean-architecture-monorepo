import { FindOnePostParam, PostDTO } from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { AuthenticatedParam } from '../../../core/authenticated.param';
import { InsufficientPermissionsError } from '../../auth/auth.errors';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class GetPostUseCase
  implements UseCase<AuthenticatedParam<FindOnePostParam>, PostDTO>
{
  constructor(private readonly repository: PostsRepository) {}

  async execute(
    param: AuthenticatedParam<FindOnePostParam>
  ): Promise<PostDTO | PostNotFoundError | Error> {
    const ability = param.user.ability;
    const findOnePostParam = param.data;

    if (!ability) return new Error('Ability is required'); // TODO: add internal and external errors

    const post = await this.repository.getPost(findOnePostParam, ability);

    if (post instanceof Error) return post;

    if (!ability || !ability.can(Action.Read, post))
      return new InsufficientPermissionsError();

    return post;
  }
}
