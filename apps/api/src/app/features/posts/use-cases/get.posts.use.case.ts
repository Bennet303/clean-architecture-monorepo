import {
  FindPostsParam,
  PaginatedResponse,
  PostDTO,
} from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { AuthenticatedParam } from '../../../core/authenticated.param';
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
