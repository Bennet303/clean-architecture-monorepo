import { PostDTO } from '../dtos/post.dto';
import { UserModel } from './user.model';

export class PostModel {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: UserModel;

  constructor(obj: PostModel) {
    this._id = obj._id;
    this.title = obj.title;
    this.content = obj.content;
    this.createdAt = obj.createdAt;
    this.author = obj.author;
  }

  static fromDTO(dto: PostDTO): PostModel {
    return new PostModel({
      _id: dto.id,
      title: dto.title,
      content: dto.content,
      createdAt: dto.createdAt,
      author: UserModel.fromDTO(dto.author),
    });
  }

  static toDTO(obj: PostModel): PostDTO {
    return new PostDTO({
      id: obj._id,
      title: obj.title,
      content: obj.content,
      createdAt: obj.createdAt,
      author: UserModel.toDTO(obj.author),
    });
  }
}
