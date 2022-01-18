import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponseProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationParam } from '../params/pagination.param';

export class PaginatedResponseDTO<T> extends PaginationParam {
  items!: T[];

  @ApiResponseProperty({ type: Number, example: 1 })
  total!: number;

  constructor(obj: PaginatedResponseDTO<T>) {
    super(obj);
    Object.assign(this, obj);
  }
}

// This is needed to make generics work with swagger - it will replace the ApiOkResponse decorator
export const ApiPaginatedDto = <TModel extends Type<unknown>>(
  model: TModel
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDTO) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};
