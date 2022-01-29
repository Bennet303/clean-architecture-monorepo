import { Ability } from '@casl/ability';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthAbility = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Ability => {
    const request = ctx.switchToHttp().getRequest();
    return request.ability;
  }
);
