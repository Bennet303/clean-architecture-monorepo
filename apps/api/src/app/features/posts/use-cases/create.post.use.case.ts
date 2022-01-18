import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { CreatePostParam } from '../../../core/dtos/params/posts/create.post.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostParam, PostDTO> {
  constructor(private readonly repository: PostsRepository) {}

  execute(param: CreatePostParam): Promise<PostDTO | Error> {
    return this.repository.createPost(param);
  }
}
