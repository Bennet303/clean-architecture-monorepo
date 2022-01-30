import { PostDTO } from '@clean-architecture-monorepo/dtos';
import { Model } from '@clean-architecture-monorepo/shared';
import { RemoveMethods } from '../utils/remove.methods';
import { MockUserModel } from './mock.user.model';

export class MockPostModel extends Model<PostDTO> {
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
