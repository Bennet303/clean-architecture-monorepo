import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { UpdatePostParam } from '../../../core/dtos/params/posts/update.post.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class EditPostUseCase
  implements UseCase<UpdatePostParam & FindOnePostParam, PostDTO>
{
  constructor(private readonly repository: PostsRepository) {}

  execute(
    param: UpdatePostParam & FindOnePostParam
  ): Promise<PostDTO | PostNotFoundError | Error> {
    return this.repository.updatePost(param);
  }
}
