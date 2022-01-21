import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { ApiUser } from '../../../core/auth/api.user';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { InsufficientPermissionsError } from '../../auth/auth.errors';
import { CASLAbilityFactory } from '../../auth/casl/casl.ability.factory';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class GetPostUseCase implements UseCase<FindOnePostParam, PostDTO> {
  constructor(
    private readonly repository: PostsRepository,
    private caslAbilityFactory: CASLAbilityFactory
  ) {}

  async execute(
    param: FindOnePostParam
  ): Promise<PostDTO | PostNotFoundError | Error> {
    const user = new ApiUser({ id: '1', isAdmin: false });
    const ability = this.caslAbilityFactory.createForUser(user);

    const post = await this.repository.getPost(param);

    if (post instanceof Error) return post;

    if (!ability.can(Action.Read, post))
      return new InsufficientPermissionsError();

    return post;
  }
}
