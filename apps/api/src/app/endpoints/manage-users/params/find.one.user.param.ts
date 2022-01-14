import { UserDTO } from '../../../core/dtos/user.dto';
import { Parameter } from '../../../core/parameter';

export class FindOneUserParam extends UserDTO implements Parameter {}
