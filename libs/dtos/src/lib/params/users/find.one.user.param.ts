import { PickType } from '@nestjs/swagger';
import { UserDTO } from '../../user.dto';
import { Parameter } from '../parameter';

export class FindOneUserParam
  extends PickType(UserDTO, ['id'])
  implements Parameter {}
