import { Model } from './abstracts/model';
import { PostDTO } from '@clean-architecture-monorepo/dtos';

export abstract class PostModel extends Model<PostDTO> {}
