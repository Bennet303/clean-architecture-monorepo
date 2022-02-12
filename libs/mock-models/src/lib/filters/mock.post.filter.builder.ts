import { Comparator } from '../../../../model-interfaces/src/lib/filters/base/comparator';
import { Filter } from '../../../../model-interfaces/src/lib/filters/base/filter';
import { PostFilterBuilder } from '../../../../model-interfaces/src/lib/filters/post.filter.builder';

export class MockPostFilterBuilder implements PostFilterBuilder {
  authorIds: string[] = [];
  ids: string[] = [];
  createdAfter?: Date;
  createdBefore?: Date;

  addAuthorFilter(filter: Filter<string>): this {
    this.authorIds.concat(...filter.value);
    return this;
  }

  addIdFilter(filter: Filter<string>): this {
    this.ids.concat(...filter.value);
    return this;
  }

  addCreatedDateFilter(filter: Filter<Date>): this {
    if (!(filter.value instanceof Date))
      throw new Error('Only single values are supported.');
    if (filter.comparator === Comparator.LESS_THAN) {
      this.createdBefore = filter.value;
    } else if (filter.comparator === Comparator.GREATER_THAN) {
      this.createdAfter = filter.value;
    } else {
      throw new Error(
        'Only less than and greater than comparators are supported.'
      );
    }
    return this;
  }
}
