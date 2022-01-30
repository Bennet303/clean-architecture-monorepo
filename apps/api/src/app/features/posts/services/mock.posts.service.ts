import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../../core/dtos/params/posts/update.post.param';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
import { OrmPostModel } from '../../../core/models/typeorm/orm.post.model';
import { PostNotFoundError } from '../post.feature.errors';
import { PostsService } from './posts.service';
import { ExtendedCreatePostParam } from '../../../core/dtos/params/posts/extended.create.post.param';
import { Injectable } from '@nestjs/common';
import { Ability } from '@casl/ability';
import { Action } from '../../../core/auth/action';
import { UserDTO } from '../../../core/dtos/user.dto';

@Injectable()
export class MockPostsService implements PostsService {
  postsDB: OrmPostModel[] = [
    new OrmPostModel({
      id: '1',
      title: 'Title',
      content: 'This is the content of the post.',
      author: new UserDTO({ id: '1' }),
      createdAt: new Date(),
    }),
  ];

  async getPost(findOnePost: FindOnePostParam): Promise<OrmPostModel> {
    const res = this.postsDB.find((post) => post.id === findOnePost.id);
    if (!res) throw new PostNotFoundError();

    return new Promise((resolve) => setTimeout(() => resolve(res), 500));
  }

  getPosts(
    query: FindPostsParam,
    ability: Ability
  ): Promise<PaginatedResponse<OrmPostModel>> {
    const posts = this.postsDB.filter((post) => {
      const isValid = ability.can(Action.Read, post);
      const matchAuthor = query.author_id
        ? query.author_id.includes(post.author.id)
        : true;
      const matchCreatedBefore = query.created_before
        ? post.createdAt < query.created_before
        : true;
      const matchCreatedAfter = query.created_after
        ? post.createdAt > query.created_after
        : true;
      return isValid && matchAuthor && matchCreatedBefore && matchCreatedAfter;
    });
    const paginatedPosts = posts.slice(
      query.offset,
      query.offset + query.limit
    );
    const res = new PaginatedResponse<OrmPostModel>({
      total: posts.length,
      limit: query.limit,
      offset: query.offset,
      items: paginatedPosts,
    });
    return new Promise((resolve) => setTimeout(() => resolve(res), 500));
  }

  createPost(post: ExtendedCreatePostParam): Promise<OrmPostModel> {
    const id = Math.floor(100000 + Math.random() * 900000);

    const newPost = new OrmPostModel({
      id: id.toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
    });

    this.postsDB.push(newPost);
    return new Promise((resolve) => setTimeout(() => resolve(newPost), 500));
  }

  updatePost(
    updatePost: FindOnePostParam & UpdatePostParam
  ): Promise<OrmPostModel> {
    const post = this.postsDB.find((post) => post.id === updatePost.id);
    if (!post) throw new PostNotFoundError();

    post.title = updatePost.title ?? post.title;
    post.content = updatePost.content ?? post.content;

    return new Promise((resolve) => setTimeout(() => resolve(post), 500));
  }

  deletePost(fineOnePost: FindOnePostParam): Promise<void> {
    const post = this.postsDB.find((post) => post.id === fineOnePost.id);
    if (!post) throw new PostNotFoundError();

    this.postsDB = this.postsDB.filter((post) => post.id !== fineOnePost.id);

    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
}
