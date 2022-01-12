export interface AuthStateModel {
  token: string;
  errorMessage: string;
  isLoading: boolean;
}

export const defaultAuthStateModel: AuthStateModel = {
  token: '',
  errorMessage: '',
  isLoading: false,
};
