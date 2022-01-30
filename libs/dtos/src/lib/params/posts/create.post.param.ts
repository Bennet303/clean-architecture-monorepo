import { OmitType } from '@nestjs/swagger';
import { PostDTO } from '../../post.dto';
import { Parameter } from '../parameter';

/* 
could also be omitted from ExtendedCreatePostParam but I think omitting
from PostDTO directly creates more clarity 
*/
export class CreatePostParam
  extends OmitType(PostDTO, ['id', 'createdAt', 'author'])
  implements Parameter {}
