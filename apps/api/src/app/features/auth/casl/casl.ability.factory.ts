import { ApiUser } from '../../../core/auth/api.user';
import { PostDTO } from '../../../core/dtos/post.dto';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoQuery,
} from '@casl/ability';
import { Action } from '../../../core/auth/action';
import { Injectable } from '@nestjs/common';
import { Roles } from '../../../core/auth/roles';

type Subjects = InferSubjects<typeof PostDTO | typeof ApiUser> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CASLAbilityFactory {
  createForUser(user: ApiUser) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );

    if (user.roles.includes(Roles.ADMIN)) {
      can(Action.Manage, 'all'); // default read-write access to everything
    } else {
      can(Action.Read, 'all'); // default read-only access to everything
    }

    const authorQuery = {
      'author.id': user.id,
    } as MongoQuery<PostDTO>; // 'as' keyword seems to be needed in order to query for nested fields in this way

    can(Action.Create, PostDTO); // create posts
    can(Action.Update, PostDTO, authorQuery); // update own posts
    can(Action.Delete, PostDTO, authorQuery); // delete own posts

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
