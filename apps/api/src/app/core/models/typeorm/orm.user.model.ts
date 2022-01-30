import { UserDTO } from '../../dtos/user.dto';
import { Model } from '../../abstracts/model';

export class OrmUserModel extends Model<UserDTO> {
  _id!: string;

  constructor(obj: UserDTO) {
    super(obj);
  }

  protected fromDTO(dto: UserDTO): this {
    this._id = dto.id;
    return this;
  }

  toDTO(): UserDTO {
    return new UserDTO({
      id: this._id,
    });
  }
}
