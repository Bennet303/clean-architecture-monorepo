import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class GetPostsUseCase
  implements UseCase<FindPostsParam, PaginatedResponse<PostDTO>>
{
  constructor(private readonly repository: PostsRepository) {}

  execute(param: FindPostsParam): Promise<PaginatedResponse<PostDTO> | Error> {
    return this.repository.getPosts(param);
  }
}
