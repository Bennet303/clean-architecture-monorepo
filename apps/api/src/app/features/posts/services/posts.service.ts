import { Ability } from '@casl/ability';
import {
  FindOnePostParam,
  FindPostsParam,
  PaginatedResponse,
  ExtendedCreatePostParam,
  UpdatePostParam,
  PostDTO,
} from '@clean-architecture-monorepo/dtos';
import { Model } from '@clean-architecture-monorepo/shared';

export abstract class PostsService {
  abstract getPost(findOnePost: FindOnePostParam): Promise<Model<PostDTO>>;
  abstract getPosts(
    query: FindPostsParam,
    ability: Ability
  ): Promise<PaginatedResponse<Model<PostDTO>>>;
  abstract createPost(post: ExtendedCreatePostParam): Promise<Model<PostDTO>>;
  abstract updatePost(
    updatePost: FindOnePostParam & UpdatePostParam
  ): Promise<Model<PostDTO>>;
  abstract deletePost(fineOnePost: FindOnePostParam): Promise<void>;
}
