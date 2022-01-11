import { UserEntity } from '@clean-architecture-monorepo/api-interfaces';

export interface HomePageStateModel {
  user: UserEntity | undefined;
  isLoading: boolean;
  errorMessage: string;
}

export const defaultHomePageStateModel: HomePageStateModel = {
  user: undefined,
  isLoading: false,
  errorMessage: '',
};
