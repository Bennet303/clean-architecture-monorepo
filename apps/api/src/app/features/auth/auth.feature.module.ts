import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CASLModule } from './casl.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), CASLModule],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthFeatureModule {}
