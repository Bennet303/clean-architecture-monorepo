import { UserEntity } from '@clean-architecture-monorepo/shared';

export interface HomePageStateModel {
  user?: UserEntity;
  isLoading: boolean;
  errorMessage: string;
}

export const defaultHomePageStateModel: HomePageStateModel = {
  user: undefined,
  isLoading: false,
  errorMessage: '',
};
