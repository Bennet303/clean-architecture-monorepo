import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { BaseController } from '../../core/abstracts/base.controller';
import {
  ApiPaginatedDto,
  PaginatedResponse,
} from '../../core/dtos/responses/paginated.response.dto';
import { PostDTO } from '../../core/dtos/post.dto';
import { UserDTO } from '../../core/dtos/user.dto';
import { FindOneUserParam } from '../../core/dtos/params/users/find.one.user.param';
import { CreatePostParam } from '../../core/dtos/params/posts/create.post.param';
import { FindPostsParam } from '../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../core/dtos/params/posts/update.post.param';
import { FindOnePostParam } from '../../core/dtos/params/posts/find.one.post.param';

@Controller({
  version: '1',
  path: '/posts',
})
@ApiTags('posts')
@ApiExtraModels(PaginatedResponse)
@ApiTooManyRequestsResponse({ description: 'Too many requests.' })
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
export class PostsController extends BaseController {
  @Get('/:id')
  @ApiOperation({ summary: 'Get a post by id.' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    description: 'Success. Returns the searched for post.',
    type: PostDTO,
  })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiBadRequestResponse({ description: 'Invalid post id.' })
  async getPost(@Param() param: FindOneUserParam): Promise<PostDTO> {
    const user = new UserDTO({
      id: '1',
    });
    return new PostDTO({
      id: '1',
      title: 'Title',
      content: 'This is the content of the post.',
      author: user,
      createdAt: new Date(),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts that match the filter.' })
  @ApiPaginatedDto(PostDTO)
  @ApiBadRequestResponse({ description: 'Invalid http query params.' })
  async getPosts(
    @Query() query: FindPostsParam
  ): Promise<PaginatedResponse<PostDTO>> {
    const user = new UserDTO({
      id: '1',
    });
    return new PaginatedResponse({
      total: 1,
      limit: 10,
      offset: 0,
      items: [
        new PostDTO({
          id: '1',
          title: 'Title',
          content: 'This is the content of the post.',
          author: user,
          createdAt: new Date(),
        }),
      ],
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post.' })
  @ApiBody({ type: CreatePostParam })
  @ApiCreatedResponse({
    description: 'The post has been created. Returns the newly created post.',
    type: PostDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid post.' })
  async createPost(@Body() post: CreatePostParam): Promise<PostDTO> {
    throw new Error('Method not implemented.');
    // const user = new UserDTO({
    //   id: '1',
    // });
    // return new PostDTO({
    //   id: '1',
    //   author: user,
    //   createdAt: new Date(),
    //   ...post,
    // });
  }

  // PATCH is used instead of PUT because we only allow updating the content and the title fields instead of replacing the whole post.
  @Patch('/:id')
  @ApiOperation({ summary: 'Update a post.' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdatePostParam })
  @ApiOkResponse({
    description: 'The post has been updated. Returns the updated post.',
    type: PostDTO,
  })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiBadRequestResponse({ description: 'Invalid patch document.' })
  async updatePost(
    @Param() param: FindOnePostParam,
    @Body() post: UpdatePostParam
  ): Promise<PostDTO> {
    const user = new UserDTO({
      id: '1',
    });
    return new PostDTO({
      id: param.id,
      author: user,
      createdAt: new Date(),
      content: post.content ?? 'This is the content of the post.',
      title: post.title ?? 'Title',
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a post.' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'The post has been deleted.' })
  @ApiNotFoundResponse({ description: 'The post does not exist.' })
  @ApiBadRequestResponse({ description: 'Invalid post id.' })
  async deletePost(@Param() param: FindOnePostParam): Promise<void> {
    return;
  }
}
