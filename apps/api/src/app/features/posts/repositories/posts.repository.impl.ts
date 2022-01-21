import { Injectable } from '@nestjs/common';
import { CreatePostParam } from '../../../core/dtos/params/posts/create.post.param';
import { ExtendedCreatePostParam } from '../../../core/dtos/params/posts/extended.create.post.param';
import { FindOnePostParam } from '../../../core/dtos/params/posts/find.one.post.param';
import { FindPostsParam } from '../../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../../core/dtos/params/posts/update.post.param';
import { PostDTO } from '../../../core/dtos/post.dto';
import { PaginatedResponse } from '../../../core/dtos/responses/paginated.response.dto';
import { UserDTO } from '../../../core/dtos/user.dto';
import { PostModel } from '../../../core/models/post.model';
import { PostsService } from '../services/posts.service';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(private readonly service: PostsService) {}

  async getPost(findOnePost: FindOnePostParam): Promise<PostDTO | Error> {
    try {
      const model = await this.service.getPost(findOnePost);
      return PostModel.toDTO(model);
    } catch (error) {
      return error as Error;
    }
  }

  async getPosts(
    query: FindPostsParam
  ): Promise<PaginatedResponse<PostDTO> | Error> {
    try {
      const model = await this.service.getPosts(query);
      const postDTOs = model.items.map(PostModel.toDTO);

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
      return PostModel.toDTO(model);
    } catch (error) {
      return error as Error;
    }
  }

  async updatePost(
    updatePost: FindOnePostParam & UpdatePostParam
  ): Promise<PostDTO | Error> {
    try {
      const model = await this.service.updatePost(updatePost);
      return PostModel.toDTO(model);
    } catch (error) {
      return error as Error;
    }
  }

  async deletePost(fineOnePost: FindOnePostParam): Promise<void | Error> {
    try {
      return await this.service.deletePost(fineOnePost);
    } catch (error) {
      return error as Error;
    }
  }
}
