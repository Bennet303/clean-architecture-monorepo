import { Module } from '@nestjs/common';
import { PostsRepository } from './repositories/posts.repository';
import { PostsRepositoryImpl } from './repositories/posts.repository.impl';
import { MockPostsService } from './services/mock.posts.service';
import { PostsService } from './services/posts.service';
import { CreatePostUseCase } from './use-cases/create.post.use.case';
import { DeletePostUseCase } from './use-cases/delete.post.use.case';
import { EditPostUseCase } from './use-cases/edit.post.use.case';
import { GetPostsUseCase } from './use-cases/get.posts.use.case';
import { GetPostUseCase } from './use-cases/get.post.use.case';
import { environment } from '../../../../src/environments/environment';
import { CASLModule } from '../auth/casl.module';

@Module({
  imports: [CASLModule],
  providers: [
    CreatePostUseCase,
    DeletePostUseCase,
    EditPostUseCase,
    GetPostsUseCase,
    GetPostUseCase,
    { provide: PostsRepository, useClass: PostsRepositoryImpl },
    {
      provide: PostsService,
      useFactory: () => {
        if (environment.useMockData) {
          return new MockPostsService();
        } else {
          return new MockPostsService(); // use real service here
        }
      },
    },
  ],
  exports: [
    CreatePostUseCase,
    DeletePostUseCase,
    EditPostUseCase,
    GetPostsUseCase,
    GetPostUseCase,
  ],
})
export class PostsFeatureModule {}
