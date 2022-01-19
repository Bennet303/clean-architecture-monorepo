import { OmitType } from '@nestjs/swagger';
import { PostDTO } from '../../post.dto';
import { Parameter } from '../parameter';

export class ExtendedCreatePostParam
  extends OmitType(PostDTO, ['id'])
  implements Parameter
{
  constructor(obj: ExtendedCreatePostParam) {
    super(obj);
    Object.assign(this, obj);
  }
}
