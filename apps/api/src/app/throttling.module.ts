import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { environment } from '../environments/environment';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      // 10 request in 60 seconds from the same IP to the same endpoint will result in an status 429
      ttl: environment.throttlerTTL,
      limit: environment.throttlerLimit,
    }),
  ],
  providers: [
    {
      // This is the guard that will be used to protect all endpoints
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlingModule {}
