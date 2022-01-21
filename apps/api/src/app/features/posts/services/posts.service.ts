import { Ability } from '@casl/ability';
import { ExtendedCreatePostParam } from '../../../core/dtos/params/posts/extended.create.post.param';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../../core/dtos/params/posts/update.post.param';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
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
