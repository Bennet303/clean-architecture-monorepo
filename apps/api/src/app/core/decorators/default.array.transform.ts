import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function DefaultArrayTransform() {
  return applyDecorators(Transform(({ value }) => value.split(',')));
}
