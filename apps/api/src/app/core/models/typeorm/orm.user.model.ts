import { UserDTO } from '../../dtos/user.dto';
import { Model } from '../../abstracts/model';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class OrmUserModel extends BaseEntity implements Model<UserDTO> {
  @PrimaryGeneratedColumn()
  id!: string;

  constructor(obj: UserDTO) {
    super();
    if (obj) this.fromDTO(obj);
  }

  fromDTO(dto: UserDTO): this {
    this.id = dto.id;
    return this;
  }

  toDTO(): UserDTO {
    return new UserDTO({
      id: this.id,
    });
  }
}
