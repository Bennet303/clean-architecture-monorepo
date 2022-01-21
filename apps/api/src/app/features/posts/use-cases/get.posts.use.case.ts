import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { Action } from '../../../core/auth/action';
import { ApiUser } from '../../../core/auth/api.user';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
import { CASLAbilityFactory } from '../../auth/casl/casl.ability.factory';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class GetPostsUseCase
  implements UseCase<FindPostsParam, PaginatedResponse<PostDTO>>
{
  constructor(
    private readonly repository: PostsRepository,
    private readonly caslAbilityFactory: CASLAbilityFactory
  ) {}

  async execute(
    param: FindPostsParam
  ): Promise<PaginatedResponse<PostDTO> | Error> {
    const user = new ApiUser({ id: '1', isAdmin: false });
    const ability = this.caslAbilityFactory.createForUser(user);
    const posts = await this.repository.getPosts(param, ability);

    if (posts instanceof Error) return posts;

    posts.items = posts.items.filter((post) => ability.can(Action.Read, post));

    return posts;
  }
}
