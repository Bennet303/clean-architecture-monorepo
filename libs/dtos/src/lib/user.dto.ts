import { UserEntity } from '@clean-architecture-monorepo/shared';
import { ApiProperty } from '@nestjs/swagger';
import { UserId } from './decorators/user.id.decorator';
import { DTO } from './dto';

export class UserDTO extends DTO implements UserEntity {
  @ApiProperty({ example: '1' })
  @UserId()
  readonly id!: string;

  constructor(obj: UserDTO) {
    super(obj);
    Object.assign(this, obj);
  }
}
