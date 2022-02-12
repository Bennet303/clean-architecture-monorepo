import { Ability } from '@casl/ability';
import {
  PaginatedResponse,
  ExtendedCreatePostParam,
  UpdatePostParam,
  PaginationParam,
  FindOnePostParam,
} from '@clean-architecture-monorepo/dtos';
import {
  PostFilterBuilder,
  PostModel,
} from '@clean-architecture-monorepo/model-interfaces';

export abstract class PostsService {
  /**
   * Create an instance of the PostFilterBuilder, specific to the implementation of the service.
   * It can be passed to other methods of the service to filter the results.
   *
   * @returns The filter builder
   */
  abstract getFilterBuilder(): PostFilterBuilder;

  /**
   * Finds one post.
   *
   * @param findOneParam - The parameters to find the post
   * @param ability - The authorization ability
   * @returns The post. If multiple posts match the filter, the first one is returned.
   * Only results that the user has permission to read are returned.
   * @throws {PostNotFoundError} - If no post matches the filter.
   * @throws {InsufficientPermissionsError} - If the user does not have permission to read the post.
   */
  abstract getOnePost(
    findOneParam: FindOnePostParam,
    ability: Ability
  ): Promise<PostModel>;

  /**
   * Finds posts.
   * @param builder - The filter builder
   * @param ability - The authorization ability
   * @returns The posts.
   * Only results that the user has permission to read are returned.
   */
  abstract getPosts(
    builder: PostFilterBuilder,
    ability: Ability
  ): Promise<PostModel[]>;

  /**
   * Finds Posts in a paginated format.
   * @param builder - The filter builder
   * @param pagination - The pagination parameters
   * @param ability - The authorization ability
   * @returns The posts in a paginated format.
   * Only results that the user has permission to read are returned.
   */
  abstract getPostsPaginated(
    builder: PostFilterBuilder,
    pagination: PaginationParam,
    ability: Ability
  ): Promise<PaginatedResponse<PostModel>>;

  /**
   * Creates a post.
   * @param params - The parameters of the post to create.
   * @returns The created post.
   * @throws {PostAlreadyExistsError} - If a the post already exists.
   */
  abstract createPost(post: ExtendedCreatePostParam): Promise<PostModel>;

  /**
   * Updates an existing post.
   * @param findOneParam - The parameters to find the post to update.
   * @param updatePost - The patch document.
   * @param ability - The authorization ability
   * @returns The updated post.
   * @throws {PostNotFoundError} - If the post does not exist.
   * @throws {MultiplePostsFoundError} - If more than one post matches the filter.
   */
  abstract updateOnePost(
    findOneParam: FindOnePostParam,
    updatePost: UpdatePostParam,
    ability: Ability
  ): Promise<PostModel>;

  /**
   * Deletes a post.
   * @param findOneParam - The parameters to find the post to delete.
   * @throws {PostNotFoundError} - If the post does not exist.
   */
  abstract deleteOnePost(findOneParam: FindOnePostParam): Promise<void>;
}
