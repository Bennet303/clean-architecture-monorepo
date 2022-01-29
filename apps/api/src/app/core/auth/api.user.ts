import { Ability } from '@casl/ability';
import { Roles } from './roles';

// If you dont work with user dtos and models you might want to change this to 'User'
export class ApiUser {
  id: string;
  isAdmin: boolean;
  roles: Roles[];
  ability?: Ability;

  constructor(obj: ApiUser) {
    this.id = obj.id;
    this.isAdmin = obj.isAdmin;
    this.roles = obj.roles;
    this.ability = obj.ability;
  }
}
