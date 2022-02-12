import { Ability } from '@casl/ability';
import {
  CreatePostParam,
  ExtendedCreatePostParam,
  FindOnePostParam,
  FindPostsParam,
  PaginatedResponse,
  PostDTO,
  UpdatePostParam,
  UserDTO,
} from '@clean-architecture-monorepo/dtos';
import {
  Comparator,
  Filter,
} from '@clean-architecture-monorepo/model-interfaces';
import { Injectable } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(private readonly service: PostsService) {}

  async getPost(
    findOnePost: FindOnePostParam,
    ability: Ability
  ): Promise<PostDTO | Error> {
    try {
      const model = await this.service.getOnePost(findOnePost, ability);
      return model.toDTO();
    } catch (error) {
      return error as Error;
    }
  }

  async getPosts(
    query: FindPostsParam,
    ability: Ability
  ): Promise<PaginatedResponse<PostDTO> | Error> {
    try {
      const builder = this.service.getFilterBuilder();

      if (query.author_id) builder.addAuthorFilter(new Filter(query.author_id));
      if (query.created_before)
        builder.addCreatedDateFilter(
          new Filter(query.created_before, Comparator.LESS_THAN)
        );
      if (query.created_after)
        builder.addCreatedDateFilter(
          new Filter(query.created_after, Comparator.GREATER_THAN)
        );

      const model = await this.service.getPostsPaginated(
        builder,
        query,
        ability
      );
      const postDTOs = model.items.map((item) => item.toDTO());

      return new PaginatedResponse({
        items: postDTOs,
        total: model.total,
        offset: model.offset,
        limit: model.limit,
      });
    } catch (error) {
      return error as Error;
    }
  }

  async createPost(post: CreatePostParam): Promise<PostDTO | Error> {
    try {
      const createPostParam = new ExtendedCreatePostParam({
        ...post,
        author: new UserDTO({ id: '1' }),
        createdAt: new Date(),
      });
      const model = await this.service.createPost(createPostParam);
      return model.toDTO();
    } catch (error) {
      return error as Error;
    }
  }

  async updatePost(
    updatePost: FindOnePostParam & UpdatePostParam,
    ability: Ability
  ): Promise<PostDTO | Error> {
    try {
      const model = await this.service.updateOnePost(
        updatePost,
        updatePost,
        ability
      );
      return model.toDTO();
    } catch (error) {
      return error as Error;
    }
  }

  async deletePost(fineOnePost: FindOnePostParam): Promise<void | Error> {
    try {
      return await this.service.deleteOnePost(fineOnePost);
    } catch (error) {
      return error as Error;
    }
  }
}
