import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { AuthenticatedParam } from '../../../core/dtos/params/authenticated.param';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class GetPostsUseCase
  implements
    UseCase<AuthenticatedParam<FindPostsParam>, PaginatedResponse<PostDTO>>
{
  constructor(private readonly repository: PostsRepository) {}

  async execute(
    param: AuthenticatedParam<FindPostsParam>
  ): Promise<PaginatedResponse<PostDTO> | Error> {
    const ability = param.user.ability;
    const findPostsParam = param.data;

    if (!ability) return new Error('Ability is required');

    const posts = await this.repository.getPosts(findPostsParam, ability);

    return posts;
  }
}
