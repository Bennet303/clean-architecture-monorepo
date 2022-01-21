import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
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
import { FindOneUserParam } from '../../core/dtos/params/users/find.one.user.param';
import { CreatePostParam } from '../../core/dtos/params/posts/create.post.param';
import { FindPostsParam } from '../../core/dtos/params/posts/find.posts.param';
import { UpdatePostParam } from '../../core/dtos/params/posts/update.post.param';
import { FindOnePostParam } from '../../core/dtos/params/posts/find.one.post.param';
import { CreatePostUseCase } from '../../features/posts/use-cases/create.post.use.case';
import { GetPostUseCase } from '../../features/posts/use-cases/get.post.use.case';
import { GetPostsUseCase } from '../../features/posts/use-cases/get.posts.use.case';
import { EditPostUseCase } from '../../features/posts/use-cases/edit.post.use.case';
import { DeletePostUseCase } from '../../features/posts/use-cases/delete.post.use.case';
import { PostNotFoundError } from '../../features/posts/post.feature.errors';

@Controller({
  version: '1',
  path: '/posts',
})
@ApiTags('posts')
@ApiExtraModels(PaginatedResponse)
@ApiTooManyRequestsResponse({ description: 'Too many requests.' })
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
export class PostsController extends BaseController {
  constructor(
    private readonly createPostUC: CreatePostUseCase,
    private readonly getPostUC: GetPostUseCase,
    private readonly getPostsUC: GetPostsUseCase,
    private readonly editPostUC: EditPostUseCase,
    private readonly deletePostUC: DeletePostUseCase
  ) {
    super();
    this.logger = new Logger(PostsController.name);
  }

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
    this.logger?.log(`Making call to get post... [id=${param.id}]`);
    const res = await this.getPostUC.execute(param);

    if (res instanceof PostNotFoundError) {
      this.logger?.warn(`Post not found. [id=${param.id}]`);
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    }

    if (res instanceof Error) throw this.handleUnexpectedError(res);

    this.logger?.log(
      `Successfully fetched post. [post=${JSON.stringify(res)}]`
    );
    return res;
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts that match the filter.' })
  @ApiPaginatedDto(PostDTO)
  @ApiBadRequestResponse({ description: 'Invalid http query params.' })
  async getPosts(
    @Query() query: FindPostsParam
  ): Promise<PaginatedResponse<PostDTO>> {
    this.logger?.log(
      `Making call to get posts... [query=${JSON.stringify(query)}]`
    );
    const res = await this.getPostsUC.execute(query);

    if (res instanceof Error) throw this.handleUnexpectedError(res);

    this.logger?.log(
      `Successfully fetched posts. [posts=${JSON.stringify(res)}]`
    );
    return res;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new post.' })
  @ApiBody({ type: CreatePostParam })
  @ApiCreatedResponse({
    description: 'The post has been created. Returns the newly created post.',
    type: PostDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid post.' })
  async createPost(@Body() post: CreatePostParam): Promise<PostDTO> {
    this.logger?.log(
      `Making call to create post... [post=${JSON.stringify(post)}]`
    );

    const res = await this.createPostUC.execute(post);

    if (res instanceof Error) throw this.handleUnexpectedError(res);

    this.logger?.log(
      `Successfully created post. [post=${JSON.stringify(res)}]`
    );
    return res;
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
    this.logger?.log(
      `Making call to update post... [id=${param.id}] [patch=${JSON.stringify(
        post
      )}]`
    );
    const res = await this.editPostUC.execute({ ...param, ...post });

    if (res instanceof PostNotFoundError) {
      this.logger?.warn(`Post not found. [id=${param.id}]`);
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    }

    if (res instanceof Error) throw this.handleUnexpectedError(res);

    this.logger?.log(
      `Successfully updated post. [post=${JSON.stringify(res)}]`
    );
    return res;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a post.' })
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'The post has been deleted.' })
  @ApiNotFoundResponse({ description: 'The post does not exist.' })
  @ApiBadRequestResponse({ description: 'Invalid post id.' })
  async deletePost(@Param() param: FindOnePostParam): Promise<void> {
    this.logger?.log(`Making call to delete post... [id=${param.id}]`);
    const res = await this.deletePostUC.execute(param);

    if (res instanceof PostNotFoundError) {
      this.logger?.warn(`Post not found. [id=${param.id}]`);
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    }

    if (res instanceof Error) throw this.handleUnexpectedError(res);

    this.logger?.log(`Successfully deleted post. [id=${param.id}]`);
  }
}