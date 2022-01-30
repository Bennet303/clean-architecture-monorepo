import { Ability } from '@casl/ability';
import {
  FindOnePostParam,
  PostDTO,
  FindPostsParam,
  PaginatedResponse,
  CreatePostParam,
  UpdatePostParam,
} from '@clean-architecture-monorepo/dtos';

export abstract class PostsRepository {
  abstract getPost(findOnePost: FindOnePostParam): Promise<PostDTO | Error>;
  abstract getPosts(
    query: FindPostsParam,
    ability: Ability
  ): Promise<PaginatedResponse<PostDTO> | Error>;
  abstract createPost(post: CreatePostParam): Promise<PostDTO | Error>;
  abstract updatePost(
    updatePost: FindOnePostParam & UpdatePostParam
  ): Promise<PostDTO | Error>;
  abstract deletePost(fineOnePost: FindOnePostParam): Promise<void | Error>;
}
