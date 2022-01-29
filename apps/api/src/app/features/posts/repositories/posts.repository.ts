import { Ability } from '@casl/ability';
import { CreatePostParam } from '../../../core/dtos/params/posts/create.post.param';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../../core/dtos/params/posts/update.post.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';

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
