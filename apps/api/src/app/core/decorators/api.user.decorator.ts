import { createParamDecorator } from '@nestjs/common';

export const AuthenticatedApiUser = createParamDecorator((_data, req) => {
  return req.user;
});
