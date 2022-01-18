import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export function UserId(options: { each: boolean } = { each: false }) {
  return applyDecorators(
    IsNotEmpty({ each: options.each }),
    IsString({ each: options.each }),
    Length(1, 10, { each: options.each })
  );
}
