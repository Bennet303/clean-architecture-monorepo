import { UserDTO } from '@clean-architecture-monorepo/dtos';
import { User } from '@prisma/client';
import { PrismaModel } from './prisma.model';

export class PrismaUserModel extends PrismaModel<UserDTO, User> {
  toDTO(): UserDTO {
    return new UserDTO({
      id: this.internalModel.id.toString(),
    });
  }
}
