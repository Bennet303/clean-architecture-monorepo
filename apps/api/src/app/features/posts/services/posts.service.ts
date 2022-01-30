import { Ability } from '@casl/ability';
import {
  FindOnePostParam,
  FindPostsParam,
  PaginatedResponse,
  ExtendedCreatePostParam,
  UpdatePostParam,
} from '@clean-architecture-monorepo/dtos';
import { PostModel } from '../../../core/models/post.model';

export abstract class PostsService {
  abstract getPost(findOnePost: FindOnePostParam): Promise<PostModel>;
  abstract getPosts(
    query: FindPostsParam,
    ability: Ability
  ): Promise<PaginatedResponse<PostModel>>;
  abstract createPost(post: ExtendedCreatePostParam): Promise<PostModel>;
  abstract updatePost(
    updatePost: FindOnePostParam & UpdatePostParam
  ): Promise<PostModel>;
  abstract deletePost(fineOnePost: FindOnePostParam): Promise<void>;
}
