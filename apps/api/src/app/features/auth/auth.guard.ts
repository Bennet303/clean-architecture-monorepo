import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CASLAbilityFactory } from './casl/casl.ability.factory';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly caslAbilityFactory: CASLAbilityFactory) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const header = request.header('Authorization');

    if (!header) {
      throw new HttpException(
        'Authorization: Bearer <token> header missing',
        HttpStatus.UNAUTHORIZED
      );
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException(
        'Authorization: Bearer <token> header invalid',
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = parts[1];
    throw new Error('Method not implemented.');
  }
}
