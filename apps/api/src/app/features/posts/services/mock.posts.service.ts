import { PostNotFoundError } from '../post.feature.errors';
import { PostsService } from './posts.service';
import { Injectable } from '@nestjs/common';
import { Ability } from '@casl/ability';
import { Action } from '../../../core/auth/action';
import {
  ExtendedCreatePostParam,
  FindOnePostParam,
  PaginatedResponse,
  PaginationParam,
  UpdatePostParam,
} from '@clean-architecture-monorepo/dtos';
import {
  MockPostFilterBuilder,
  MockPostModel,
  MockUserModel,
} from '@clean-architecture-monorepo/mock-models';
import { InsufficientPermissionsError } from '../../auth/auth.errors';

@Injectable()
export class MockPostsService implements PostsService {
  postsDB: MockPostModel[] = [
    new MockPostModel({
      id: '1',
      title: 'Title',
      content: 'This is the content of the post.',
      author: new MockUserModel({
        id: '1',
      }),
      createdAt: new Date(),
    }),
  ];

  getFilterBuilder(): MockPostFilterBuilder {
    return new MockPostFilterBuilder();
  }
  async getOnePost(
    findOneParam: FindOnePostParam,
    ability: Ability
  ): Promise<MockPostModel> {
    const post = this.postsDB.find((post) => post.id === findOneParam.id);
    if (!post) throw new PostNotFoundError();
    if (ability.cannot(Action.Read, post))
      throw new InsufficientPermissionsError();

    return new Promise((resolve) => setTimeout(() => resolve(post), 500));
  }

  async getPosts(
    builder: MockPostFilterBuilder,
    ability: Ability
  ): Promise<MockPostModel[]> {
    const posts = this.postsDB.filter((post) => {
      const isValid = ability.can(Action.Read, post);
      const matchAuthor = builder.authorIds
        ? builder.authorIds.includes(post.author.id)
        : true;
      const matchCreatedBefore = builder.createdBefore
        ? post.createdAt < builder.createdBefore
        : true;
      const matchCreatedAfter = builder.createdAfter
        ? post.createdAt > builder.createdAfter
        : true;
      return isValid && matchAuthor && matchCreatedBefore && matchCreatedAfter;
    });
    return posts;
  }

  async getPostsPaginated(
    builder: MockPostFilterBuilder,
    pagination: PaginationParam,
    ability: Ability
  ): Promise<PaginatedResponse<MockPostModel>> {
    const posts = await this.getPosts(builder, ability);
    const paginatedPosts = posts.slice(
      pagination.offset,
      pagination.offset + pagination.limit
    );
    const res = new PaginatedResponse<MockPostModel>({
      total: posts.length,
      limit: pagination.limit,
      offset: pagination.offset,
      items: paginatedPosts,
    });
    return new Promise((resolve) => setTimeout(() => resolve(res), 500));
  }

  createPost(post: ExtendedCreatePostParam): Promise<MockPostModel> {
    const id = Math.floor(100000 + Math.random() * 900000);

    const newPost = new MockPostModel({
      id: id.toString(),
      title: post.title,
      content: post.content,
      author: new MockUserModel({ ...post.author }),
      createdAt: post.createdAt,
    });

    this.postsDB.push(newPost);
    return new Promise((resolve) => setTimeout(() => resolve(newPost), 500));
  }

  async updateOnePost(
    findOneParam: FindOnePostParam,
    updatePost: UpdatePostParam,
    ability: Ability
  ): Promise<MockPostModel> {
    const post = await this.getOnePost(findOneParam, ability);
    if (!post) throw new PostNotFoundError();

    post.title = updatePost.title ?? post.title;
    post.content = updatePost.content ?? post.content;

    return new Promise((resolve) => setTimeout(() => resolve(post), 500));
  }

  deleteOnePost(findOneParam: FindOnePostParam): Promise<void> {
    const post = this.postsDB.find((post) => post.id === findOneParam.id);
    if (!post) throw new PostNotFoundError();

    this.postsDB = this.postsDB.filter((post) => post.id !== findOneParam.id);

    return new Promise((resolve) => setTimeout(() => resolve(), 500));
  }
}
