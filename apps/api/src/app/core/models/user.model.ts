import { UserDTO } from '../dtos/user.dto';

export class UserModel {
  _id: string;

  constructor(obj: UserModel) {
    this._id = obj._id;
  }

  static fromDTO(dto: UserDTO): UserModel {
    const model = new UserModel({
      _id: dto.id,
    });
    return model;
  }

  static toDTO(obj: UserModel): UserDTO {
    const dto = new UserDTO({
      id: obj._id,
    });
    return dto;
  }
}
