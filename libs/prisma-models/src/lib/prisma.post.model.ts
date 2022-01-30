import { PostDTO } from '@clean-architecture-monorepo/dtos';
import { Prisma } from '@prisma/client';
import { PrismaModel } from './prisma.model';
import { PrismaUserModel } from './prisma.user.model';

// by default the generated model will only include scalar fields (https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-using-variations-of-the-generated-model-type)
export type PostWithAuthor = Prisma.PostGetPayload<{
  include: {
    author: true;
  };
}>;

export class PrismaPostModel extends PrismaModel<PostDTO, PostWithAuthor> {
  toDTO(): PostDTO {
    if (!this.internalModel.author) throw new Error('Post must have an author');

    return new PostDTO({
      id: this.internalModel.id.toString(),
      title: this.internalModel.title,
      content: this.internalModel.content,
      createdAt: this.internalModel.createdAt,
      author: new PrismaUserModel(this.internalModel.author).toDTO(),
    });
  }
}
