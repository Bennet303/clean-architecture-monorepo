import { PostDTO } from '@clean-architecture-monorepo/dtos';
import { MockUserModel } from './mock.user.model';
import { PostModel } from '@clean-architecture-monorepo/model-interfaces';
import { RemoveMethods } from '@clean-architecture-monorepo/shared';

export class MockPostModel extends PostModel {
  id!: string;
  title!: string;
  author!: MockUserModel;
  content!: string;
  createdAt!: Date;

  constructor(obj: RemoveMethods<MockPostModel>) {
    super();
    Object.assign(this, obj);
  }

  toDTO(): PostDTO {
    return new PostDTO({
      id: this.id,
      title: this.title,
      author: this.author.toDTO(),
      content: this.content,
      createdAt: this.createdAt,
    });
  }
}
