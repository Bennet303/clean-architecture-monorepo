import {
  AuthenticatedParam,
  UpdatePostParam,
  FindOnePostParam,
  PostDTO,
} from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { InsufficientPermissionsError } from '../../auth/auth.errors';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class EditPostUseCase
  implements
    UseCase<AuthenticatedParam<UpdatePostParam & FindOnePostParam>, PostDTO>
{
  constructor(private readonly repository: PostsRepository) {}

  async execute(
    param: AuthenticatedParam<UpdatePostParam & FindOnePostParam>
  ): Promise<
    PostDTO | PostNotFoundError | InsufficientPermissionsError | Error
  > {
    const ability = param.user.ability;

    const post = await this.repository.getPost(param.data);

    if (post instanceof Error) return post;

    if (!ability || !ability.can(Action.Update, post))
      return new InsufficientPermissionsError();

    return this.repository.updatePost(param.data);
  }
}
