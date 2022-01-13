import { RolesEnum } from '../../../core/enums/roles.enum';

export interface AuthStateModel {
  token: string;
  role?: RolesEnum;
  errorMessage: string;
  isLoading: boolean;
}

export const defaultAuthStateModel: AuthStateModel = {
  token: '',
  errorMessage: '',
  isLoading: false,
  role: undefined,
};
