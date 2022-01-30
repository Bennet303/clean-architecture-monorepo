import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Parameter } from './parameter';

export class PaginationParam extends Parameter {
  @ApiProperty({ default: 10, minimum: 1, maximum: 100 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  readonly limit!: number;

  @ApiProperty({ default: 0, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  readonly offset!: number;

  constructor(obj: PaginationParam) {
    super(obj);
    Object.assign(this, obj);
    this.limit = this.limit || 10;
    this.offset = this.offset || 0;
  }
}
