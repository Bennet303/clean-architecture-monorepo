import { Injectable } from '@nestjs/common';
import { Message } from '@clean-architecture-monorepo/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
