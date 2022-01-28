import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ApiUser } from '../../../core/auth/api.user';
import { Roles } from '../../../core/auth/roles';
import { CASLAbilityFactory } from '../casl/casl.ability.factory';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static readonly secret = passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  constructor(private readonly caslAbilityFactory: CASLAbilityFactory) {
    super({
      secretOrKeyProvider: JwtStrategy.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(payload: any): any {
    const roles: string[] = payload.roles;
    const apiUser: ApiUser = {
      id: payload.id,
      isAdmin: roles.includes(Roles.ADMIN),
      roles: roles as Roles[],
    };
    apiUser.ability = this.caslAbilityFactory.createForUser(apiUser);
    return apiUser;
  }
}
