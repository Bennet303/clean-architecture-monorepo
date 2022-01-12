import { Injectable } from '@angular/core';
import { TranslatableError } from '../../../../../core/abstracts/translatable.error';
import { UseCase } from '../../../../../core/abstracts/use.case';
import { LoginResponseEntity } from '../entities/login.response.entity';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class LoginUseCase implements UseCase<void, LoginResponseEntity> {
  constructor(private readonly repository: AuthRepository) {}

  execute(): Promise<LoginResponseEntity | TranslatableError> {
    return this.repository.login();
  }
}
