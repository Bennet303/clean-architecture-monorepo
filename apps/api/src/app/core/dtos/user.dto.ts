import { UserEntity } from '@clean-architecture-monorepo/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { DTO } from './dto';

export class UserDTO extends DTO implements UserEntity {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  readonly id!: string;

  constructor(obj: UserDTO) {
    super(obj);
    Object.assign(this, obj);
  }
}
