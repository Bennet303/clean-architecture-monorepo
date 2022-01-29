import { Module } from '@nestjs/common';
import { CASLAbilityFactory } from './casl/casl.ability.factory';

@Module({
  providers: [CASLAbilityFactory],
  exports: [CASLAbilityFactory],
})
export class CASLModule {}
