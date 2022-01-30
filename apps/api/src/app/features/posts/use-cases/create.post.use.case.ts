import { CreatePostParam, PostDTO } from '@clean-architecture-monorepo/dtos';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../core/abstracts/use.case';
import { PostsRepository } from '../repositories/posts.repository';

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostParam, PostDTO> {
  constructor(private readonly repository: PostsRepository) {}

  execute(param: CreatePostParam): Promise<PostDTO | Error> {
    return this.repository.createPost(param);
  }
}
