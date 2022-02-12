import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { environment } from '../../../environments/environment';

export abstract class BaseController {
  protected logger?: Logger;

  protected handleUnexpectedError(error: Error): HttpException {
    this.logger?.error(error.message, error.stack);
    return new HttpException(
      environment.local ? error.message : 'Internal Server Error.',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
