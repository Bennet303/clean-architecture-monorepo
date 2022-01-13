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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
} from '@nestjs/swagger';
import { UserDTO } from '../../core/dtos/user.dto';
import { UserNotFoundError } from '../../features/manage-users/errors/user.not.found.error';
import { CreateUserUseCase } from '../../features/manage-users/use-cases/create.user.use.case';
import { DeleteUserUseCase } from '../../features/manage-users/use-cases/delete.user.use.case';
import { GetUserUseCase } from '../../features/manage-users/use-cases/get.user.use.case';
import { FindOneUserParam } from './params/find.one.user.param';

@ApiTags('manage-users')
@Controller({
  version: '1',
  path: '/manage-users',
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
  @ApiNoContentResponse({
    description: 'No current user found',
    type: undefined,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async getUser(
    @Res({ passthrough: true }) response: Response
  ): Promise<UserDTO | undefined> {
    const res = await this.getUserUC.execute();

    if (!res) response.status(HttpStatus.NO_CONTENT);

    if (res instanceof Error)
      throw new HttpException(res.message, HttpStatus.INTERNAL_SERVER_ERROR);

    return res;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ type: UserDTO })
  @ApiCreatedResponse({ description: 'The created user.', type: UserDTO })
  @ApiBadRequestResponse({ description: 'Invalid user.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async createUser(@Body() user: UserDTO): Promise<UserDTO> {
    this.logger.log(`Creating user: ${JSON.stringify(user)}`);
    return user;
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
    const res = this.deleteUserUC.execute(params);

    if (res instanceof UserNotFoundError)
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    else if (res instanceof Error)
      throw new HttpException(res.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
