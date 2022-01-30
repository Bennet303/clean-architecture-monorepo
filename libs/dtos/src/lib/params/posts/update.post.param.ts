import { PartialType } from '@nestjs/swagger';
import { CreatePostParam } from './create.post.param';

export class UpdatePostParam extends PartialType(CreatePostParam) {}
