import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { ApiUser } from '../../../core/auth/api.user';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { InsufficientPermissionsError } from '../../auth/auth.errors';
import { CASLAbilityFactory } from '../../auth/casl/casl.ability.factory';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class DeletePostUseCase implements UseCase<FindOnePostParam, void> {
  constructor(
    private readonly repository: PostsRepository,
    private readonly caslAbilityFactory: CASLAbilityFactory
  ) {}

  async execute(
    param: FindOnePostParam
  ): Promise<void | PostNotFoundError | InsufficientPermissionsError | Error> {
    const user = new ApiUser({ id: '1', isAdmin: false });
    const ability = this.caslAbilityFactory.createForUser(user);
    const postOrError = await this.repository.getPost(param);

    if (postOrError instanceof Error) return postOrError;

    if (!ability.can(Action.Delete, postOrError))
      return new InsufficientPermissionsError();

    return this.repository.deletePost(param);
  }
}
