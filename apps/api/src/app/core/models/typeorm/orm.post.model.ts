import { Entity } from 'typeorm';
import { PostDTO } from '../../dtos/post.dto';
import { Model } from '../../abstracts/model';
import { OrmUserModel } from './orm.user.model';

type NonMethodKeys<T> = ({
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? never : P;
} & { [x: string]: never })[keyof T];
export type RemoveMethods<T> = Pick<T, NonMethodKeys<T>>;

@Entity({
  name: 'posts',
})
export class OrmPostModel extends Model<PostDTO> {
  id!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
  author!: OrmUserModel;

  constructor(obj: PostDTO) {
    super(obj);
  }

  protected fromDTO(dto: PostDTO): this {
    this.id = dto.id;
    this.title = dto.title;
    this.content = dto.content;
    this.createdAt = dto.createdAt;
    this.author = new OrmUserModel(dto.author);
    return this;
  }

  toDTO(): PostDTO {
    return new PostDTO({
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      author: this.author.toDTO(),
    });
  }
}
