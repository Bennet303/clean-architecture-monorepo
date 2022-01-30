import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { DefaultArrayTransform } from '../../decorators/default.array.transform';
import { UserId } from '../../decorators/user.id.decorator';
import { PaginationParam } from '../pagination.param';
import { Parameter } from '../parameter';

// https://opensource.zalando.com/restful-api-guidelines/index.html#236
export class FindPostsParam extends PaginationParam implements Parameter {
  @ApiPropertyOptional({
    type: [String],
    isArray: true,
    format: 'form-explode',
    example: '1,2,3',
  })
  @IsOptional()
  @UserId({ each: true })
  @DefaultArrayTransform()
  author_id?: string[];

  @ApiPropertyOptional({
    type: Date,
    example: '2022-01-17',
    exclusiveMaximum: true,
  })
  @IsOptional()
  @IsDateString()
  created_before?: Date;

  @ApiPropertyOptional({
    type: Date,
    example: '2022-01-17',
    exclusiveMinimum: true,
  })
  @IsOptional()
  @IsDateString()
  created_after?: Date;
}
