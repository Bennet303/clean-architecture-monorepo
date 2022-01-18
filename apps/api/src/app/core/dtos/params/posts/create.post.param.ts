import { OmitType } from '@nestjs/swagger';
import { PostDTO } from '../../post.dto';
import { Parameter } from '../parameter';

export class CreatePostParam
  extends OmitType(PostDTO, ['id', 'createdAt', 'author'])
  implements Parameter {}
