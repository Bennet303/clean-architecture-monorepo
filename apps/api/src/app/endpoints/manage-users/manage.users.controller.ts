import {
  UserDTO,
  FindOneUserParam,
  CreateUserParam,
} from '@clean-architecture-monorepo/dtos';
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
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiConflictResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { BaseController } from '../../core/abstracts/base.controller';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '../../features/manage-users/manage.users.feature.errors';
import { CreateUserUseCase } from '../../features/manage-users/use-cases/create.user.use.case';
import { DeleteUserUseCase } from '../../features/manage-users/use-cases/delete.user.use.case';
import { GetUserUseCase } from '../../features/manage-users/use-cases/get.user.use.case';

@Controller({
  version: '1',
  path: '/users',
})
@ApiTags('users')
@ApiTooManyRequestsResponse({ description: 'Too many requests.' })
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
export class ManageUsersController extends BaseController {
  constructor(
    private readonly getUserUC: GetUserUseCase,
    private readonly createUserUC: CreateUserUseCase,
    private readonly deleteUserUC: DeleteUserUseCase
  ) {
    super();
    this.logger = new Logger(ManageUsersController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get the current user.' })
  @ApiOkResponse({ description: 'The current user.', type: UserDTO })
  @ApiNotFoundResponse({
    description: 'No current user found',
  })
  async getUser(): Promise<UserDTO | undefined> {
    this.logger?.log('Making call to get user...');
    const res = await this.getUserUC.execute();

    if (res instanceof UserNotFoundError) {
      this.logger?.warn(`User not found. [error=${res.message}]`);
      throw new HttpException('No current user found', HttpStatus.NOT_FOUND);
    } else if (res instanceof Error) {
      throw this.handleUnexpectedError(res);
    }

    this.logger?.log(
      `Successfully returned user. [user=${JSON.stringify(res)}]`
    );
    return res;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ type: CreateUserParam })
  @ApiCreatedResponse({ description: 'The created user.', type: UserDTO })
  @ApiConflictResponse({ description: 'User already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid user.' })
  async createUser(@Body() user: CreateUserParam): Promise<UserDTO> {
    this.logger?.log(
      `Making call to create user... [user=${JSON.stringify(user)}]`
    );

    const res = await this.createUserUC.execute(user);

    if (res instanceof UserAlreadyExistsError) {
      this.logger?.warn(`User already exists. [error=${res.message}]`);
      throw new HttpException(res.message, HttpStatus.CONFLICT);
    } else if (res instanceof Error) {
      throw this.handleUnexpectedError(res);
    }

    this.logger?.log(
      `Successfully created user. [user=${JSON.stringify(res)}]`
    );
    return res;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete the current user.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user to be deleted.',
    type: String,
  })
  @ApiNoContentResponse({ description: 'The current user has been deleted.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Invalid params.' })
  async deleteUser(@Param() params: FindOneUserParam): Promise<void> {
    this.logger?.log(
      `Making call to delete user... [params=${JSON.stringify(params)}]`
    );
    const res = await this.deleteUserUC.execute(params);

    if (res instanceof UserNotFoundError) {
      this.logger?.warn(`User not found. [error=${res.message}]`);
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    } else if (res instanceof Error) {
      throw this.handleUnexpectedError(res);
    }
    this.logger?.log(`Successfully deleted user.`);
  }
}
