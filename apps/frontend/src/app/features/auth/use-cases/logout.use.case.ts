import { Injectable } from '@angular/core';
import { TranslatableError } from '../../../core/abstracts/translatable.error';
import { UseCase } from '../../../core/abstracts/use.case';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class LogoutUseCase implements UseCase<void, void> {
  constructor(private readonly repository: AuthRepository) {}

  execute(): Promise<void | TranslatableError> {
    return this.repository.logout();
  }
}
