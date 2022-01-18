import { PickType } from '@nestjs/swagger';
import { PostDTO } from '../../post.dto';
import { Parameter } from '../parameter';

export class FindOnePostParam
  extends PickType(PostDTO, ['id'])
  implements Parameter {}
