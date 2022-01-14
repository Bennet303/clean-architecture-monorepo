import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export abstract class BaseController {
  protected logger?: Logger;

  protected handleUnexpectedError(error: Error): HttpException {
    this.logger?.error(error.message, error.stack);
    return new HttpException(
      'Internal Server Error.',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
