import { Entity } from '@clean-architecture-monorepo/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DTO implements Entity {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  id: string;

  constructor(obj: DTO) {
    Object.assign(this, obj);
  }
}
