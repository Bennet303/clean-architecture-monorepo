import { UseCase } from '../../../core/abstracts/use.case';
import { ApiUser } from '../../../core/auth/api.user';

export class AuthenticateUserUseCase implements UseCase<string, ApiUser> {
  execute(param: string): Promise<ApiUser | Error> {
    throw new Error('Method not implemented.');
  }
}
