import { Comparator } from './comparator';

export class Filter<T> {
  /**
   * The value to filter on.
   */
  public readonly value: T | T[];

  /**
   * The operator to use when filtering.
   * @default Comparator.EQUAL
   */
  public readonly comparator: Comparator;

  /**
   * @param value The value to filter on.
   * @param comparator The operator to use when filtering.
   * @default Comparator.EQUAL
   * @see Comparator
   * @see Filter.comparator
   * @see Filter.value
   */
  constructor(value: T | T[], comparator = Comparator.EQUAL) {
    this.value = value;
    this.comparator = comparator;
  }
}
