import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { DTO } from './dto';
import { UserDTO } from './user.dto';

export class PostDTO extends DTO {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  readonly id!: string;

  @ApiProperty({ example: 'Title' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  readonly title!: string;

  @ApiProperty({ example: 'This is the content of the post.' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  readonly content!: string;

  @ApiProperty({ type: UserDTO })
  @IsNotEmpty()
  readonly author!: UserDTO;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDate()
  readonly createdAt!: Date;

  constructor(obj: PostDTO) {
    super(obj);
    Object.assign(this, obj);
  }
}
