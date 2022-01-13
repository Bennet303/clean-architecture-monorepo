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
} from '@nestjs/swagger';
import { UserDTO } from '../../core/dtos/user.dto';
import { UserNotFoundError } from '../../features/manage-users/errors/user.not.found.error';
import { CreateUserUseCase } from '../../features/manage-users/use-cases/create.user.use.case';
import { DeleteUserUseCase } from '../../features/manage-users/use-cases/delete.user.use.case';
import { GetUserUseCase } from '../../features/manage-users/use-cases/get.user.use.case';
import { FindOneUserParam } from './params/find.one.user.param';
import { UserAlreadyExistsError } from '../../features/manage-users/errors/user.already.exists.error';

@ApiTags('users')
@Controller({
  version: '1',
  path: '/users',
})
export class ManageUsersController {
  logger = new Logger('ManageUserController');

  constructor(
    private readonly getUserUC: GetUserUseCase,
    private readonly createUserUC: CreateUserUseCase,
    private readonly deleteUserUC: DeleteUserUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get the current user.' })
  @ApiOkResponse({ description: 'The current user.', type: UserDTO })
  @ApiNotFoundResponse({
    description: 'No current user found',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async getUser(): Promise<UserDTO | undefined> {
    const res = await this.getUserUC.execute();

    if (res instanceof UserNotFoundError)
      throw new HttpException('No current user found', HttpStatus.NOT_FOUND);
    else if (res instanceof Error)
      throw new HttpException(res.message, HttpStatus.INTERNAL_SERVER_ERROR);

    return res;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ type: UserDTO })
  @ApiCreatedResponse({ description: 'The created user.', type: UserDTO })
  @ApiConflictResponse({ description: 'User already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid user.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async createUser(@Body() user: UserDTO): Promise<UserDTO> {
    this.logger.log(`Creating user: ${JSON.stringify(user)}`);
    const res = await this.createUserUC.execute(user);

    if (res instanceof UserAlreadyExistsError)
      throw new HttpException(res.message, HttpStatus.CONFLICT);
    else if (res instanceof Error)
      throw new HttpException(res.message, HttpStatus.INTERNAL_SERVER_ERROR);

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
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async deleteUser(@Param() params: FindOneUserParam): Promise<void> {
    const res = await this.deleteUserUC.execute(params);

    if (res instanceof UserNotFoundError)
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    else if (res instanceof Error)
      throw new HttpException(res.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
