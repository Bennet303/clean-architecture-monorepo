import {
  Comparator,
  Filter,
  FilterBuilder,
} from '@clean-architecture-monorepo/model-interfaces';

export class PrismaFilterBuilder extends FilterBuilder<
  string,
  Record<string, unknown>
> {
  protected and: Array<Record<string, unknown>> = [];
  protected not: Array<Record<string, unknown>> = [];

  public build(): Record<string, unknown> {
    return {
      AND: this.and,
      NOT: this.not,
    };
  }

  protected pushFilter<T>(
    filter: Filter<T>,
    filterObject: Record<string, unknown>
  ): void {
    if (filter.comparator === Comparator.NON_EQUAL) {
      this.not.push(filterObject);
    } else {
      this.and.push(filterObject);
    }
  }

  protected _buildMatchingElementFilter<T>(
    field: string,
    value: T
  ): Record<string, unknown> {
    return {
      [field]: value,
    };
  }
  protected _buildNegatedElementFilter<T>(
    field: string,
    value: T
  ): Record<string, unknown> {
    return {
      [field]: value,
    };
  }
  protected _buildLessThanElementFilter<T>(
    field: string,
    value: T
  ): Record<string, unknown> {
    return {
      [field]: {
        lt: value,
      },
    };
  }
  protected _buildLessThanOrEqualElementFilter<T>(
    field: string,
    value: T
  ): Record<string, unknown> {
    return {
      [field]: {
        lte: value,
      },
    };
  }
  protected _buildGreaterThanElementFilter<T>(
    field: string,
    value: T
  ): Record<string, unknown> {
    return {
      [field]: {
        gt: value,
      },
    };
  }
  protected _buildGreaterThanOrEqualElementFilter<T>(
    field: string,
    value: T
  ): Record<string, unknown> {
    return {
      [field]: {
        gte: value,
      },
    };
  }
  protected _buildMatchingArrayFilter<T>(
    field: string,
    value: T[]
  ): Record<string, unknown> {
    return {
      [field]: {
        in: value,
      },
    };
  }
  protected _buildNegatedArrayFilter<T>(
    field: string,
    value: T[]
  ): Record<string, unknown> {
    return {
      [field]: {
        in: value,
      },
    };
  }
}
