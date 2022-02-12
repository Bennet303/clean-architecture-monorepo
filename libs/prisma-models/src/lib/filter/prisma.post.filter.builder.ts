import {
  Filter,
  PostFilterBuilder,
} from '@clean-architecture-monorepo/model-interfaces';
import { PrismaFilterBuilder } from './prisma.filter.builder';

export class PrismaPostFilterBuilder
  extends PrismaFilterBuilder
  implements PostFilterBuilder
{
  addAuthorFilter(filter: Filter<string>): this {
    const authorFilter = { author: { id: filter.value } };
    this.pushFilter(filter, authorFilter);
    return this;
  }
  addIdFilter(filter: Filter<string>): this {
    const idFilter = this.buildFilter('id', filter);
    this.pushFilter(filter, idFilter);
    return this;
  }
  addCreatedDateFilter(filter: Filter<Date>): this {
    const createdDateFilter = this.buildFilter('createdAt', filter);
    this.pushFilter(filter, createdDateFilter);
    return this;
  }
}
