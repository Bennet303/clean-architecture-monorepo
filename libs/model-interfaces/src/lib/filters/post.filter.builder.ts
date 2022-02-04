import { Filter } from './base/filter';

export interface PostFilterBuilder {
  /**
   * Filter by the author of the post.
   * @param filter The filter to apply on the author.
   * @returns The builder instance.
   * @see Filter
   */
  addAuthorFilter(filter: Filter<string>): this;

  /**
   * Filter by the id of the post.
   * @param filter The filter to apply on the id.
   * @returns The builder instance.
   * @see Filter
   */
  addIdFilter(filter: Filter<string>): this;

  /**
   * Filter by the creation date of the post.
   * @param filter The filter to apply on the creation-date.
   * @returns The builder instance.
   * @see Filter
   */
  addCreatedDateFilter(filter: Filter<Date>): this;
}
