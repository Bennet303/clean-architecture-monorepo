import { CreatePostParam, PostDTO } from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { AuthenticatedParam } from '../../../core/authenticated.param';
import { InsufficientPermissionsError } from '../../auth/auth.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class CreatePostUseCase
  implements UseCase<AuthenticatedParam<CreatePostParam>, PostDTO>
{
  constructor(private readonly repository: PostsRepository) {}

  async execute(
    param: AuthenticatedParam<CreatePostParam>
  ): Promise<PostDTO | Error> {
    const ability = param.user.ability;

    if (!ability || !ability.can(Action.Create, PostDTO))
      return new InsufficientPermissionsError();

    return this.repository.createPost(param.data);
  }
}
