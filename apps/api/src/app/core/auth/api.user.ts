// If you dont work with user dtos and models you might want to change this to 'User'
export class ApiUser {
  id: string;
  isAdmin: boolean;

  constructor(obj: ApiUser) {
    this.id = obj.id;
    this.isAdmin = obj.isAdmin;
  }
}
