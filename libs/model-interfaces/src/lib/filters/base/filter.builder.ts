import { Comparator } from './comparator';
import { Filter } from './filter';

export abstract class FilterBuilder<F, R> {
  protected buildFilter<T>(field: F, filter: Filter<T>): R {
    if (Array.isArray(filter.value)) {
      return this.buildArrayFilter(field, filter.value, filter.comparator);
    } else {
      return this.buildElementFilter(field, filter.value, filter.comparator);
    }
  }

  private buildElementFilter<T>(field: F, value: T, comparator: Comparator): R {
    switch (comparator) {
      case Comparator.EQUAL:
        return this._buildMatchingElementFilter(field, value);
      case Comparator.NON_EQUAL:
        return this._buildNegatedElementFilter(field, value);
      case Comparator.LESS_THAN:
        return this._buildLessThanElementFilter(field, value);
      case Comparator.LESS_THAN_OR_EQUAL:
        return this._buildLessThanOrEqualElementFilter(field, value);
      case Comparator.GREATER_THAN:
        return this._buildGreaterThanElementFilter(field, value);
      case Comparator.GREATER_THAN_OR_EQUAL:
        return this._buildGreaterThanOrEqualElementFilter(field, value);
      default:
        throw new Error('Invalid match option for single element filter');
    }
  }

  protected abstract _buildMatchingElementFilter<T>(field: F, value: T): R;
  protected abstract _buildNegatedElementFilter<T>(field: F, value: T): R;
  protected abstract _buildLessThanElementFilter<T>(field: F, value: T): R;
  protected abstract _buildLessThanOrEqualElementFilter<T>(
    field: F,
    value: T
  ): R;
  protected abstract _buildGreaterThanElementFilter<T>(field: F, value: T): R;
  protected abstract _buildGreaterThanOrEqualElementFilter<T>(
    field: F,
    value: T
  ): R;

  private buildArrayFilter<T>(field: F, value: T[], comparator: Comparator): R {
    switch (comparator) {
      case Comparator.EQUAL:
        return this._buildMatchingArrayFilter(field, value);
      case Comparator.NON_EQUAL:
        return this._buildNegatedArrayFilter(field, value);
      // case Comparator.MATCH_ALL:
      //   return this.buildMatchingAllArrayFilter(field, value);
      default:
        throw new Error('Invalid match option for array filter');
    }
  }

  protected abstract _buildMatchingArrayFilter<T>(field: F, value: T[]): R;
  protected abstract _buildNegatedArrayFilter<T>(field: F, value: T[]): R;
}
