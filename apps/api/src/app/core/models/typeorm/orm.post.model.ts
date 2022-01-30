import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostDTO } from '../../dtos/post.dto';
import { OrmUserModel } from './orm.user.model';
import { UserModel } from '../base/user.model';

type NonMethodKeys<T> = ({
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? never : P;
} & { [x: string]: never })[keyof T];
export type RemoveMethods<T> = Pick<T, NonMethodKeys<T>>;

@Entity({
  name: 'posts',
})
export class OrmPostModel extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  createdAt!: Date;

  @OneToOne(() => OrmUserModel)
  @JoinColumn()
  author!: OrmUserModel;

  constructor(obj: PostDTO) {
    super();
    if (obj) {
      this.fromDTO(obj);
    }
  }

  fromDTO(dto: PostDTO): this {
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
