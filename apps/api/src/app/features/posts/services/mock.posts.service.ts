import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../../core/dtos/params/posts/update.post.param';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
import { PostModel } from '../../../core/models/post.model';
import { UserModel } from '../../../core/models/user.model';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsService } from './posts.service';
import { ExtendedCreatePostParam } from '../../../core/dtos/params/posts/extended.create.post.param';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPostsService implements PostsService {
  postsDB: PostModel[] = [];

  async getPost(findOnePost: FindOnePostParam): Promise<PostModel> {
    const res = this.postsDB.find((post) => post._id === findOnePost.id);
    if (!res) throw new PostNotFoundError();

    return new Promise((resolve) => setTimeout(() => resolve(res), 500));
  }

  getPosts(query: FindPostsParam): Promise<PaginatedResponse<PostModel>> {
    const posts = this.postsDB.filter((post, index) => {
      const isValid =
        index >= query.offset && index < query.offset + query.limit;
      const matchAuthor = query.author_id
        ? query.author_id.includes(post.author._id)
        : true;
      const matchCreatedBefore = query.created_before
        ? post.createdAt < query.created_before
        : true;
      const matchCreatedAfter = query.created_after
        ? post.createdAt > query.created_after
        : true;
      return isValid && matchAuthor && matchCreatedBefore && matchCreatedAfter;
    });
    const res = new PaginatedResponse<PostModel>({
      total: this.postsDB.length,
      limit: query.limit,
      offset: query.offset,
      items: posts,
    });
    return new Promise((resolve) => setTimeout(() => resolve(res), 500));
  }

  createPost(post: ExtendedCreatePostParam): Promise<PostModel> {
    const id = Math.floor(100000 + Math.random() * 900000);

    const newPost = new PostModel({
      _id: id.toString(),
      title: post.title,
      content: post.content,
      author: UserModel.fromDTO(post.author),
      createdAt: post.createdAt,
    });

    this.postsDB.push(newPost);
    return new Promise((resolve) => setTimeout(() => resolve(newPost), 500));
  }

  updatePost(
    updatePost: FindOnePostParam & UpdatePostParam
  ): Promise<PostModel> {
    const post = this.postsDB.find((post) => post._id === updatePost.id);
    if (!post) throw new PostNotFoundError();

    post.title = updatePost.title ?? post.title;
    post.content = updatePost.content ?? post.content;

    return new Promise((resolve) => setTimeout(() => resolve(post), 500));
  }

  deletePost(fineOnePost: FindOnePostParam): Promise<void> {
    const post = this.postsDB.find((post) => post._id === fineOnePost.id);
    if (!post) throw new PostNotFoundError();

    this.postsDB = this.postsDB.filter((post) => post._id !== fineOnePost.id);

    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
}
