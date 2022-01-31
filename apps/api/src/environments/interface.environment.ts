export interface IEnvironment {
  name: string;
  production: boolean;
  local: boolean;
  useMockData: boolean;
  corsOrigin: string | undefined;
  throttlerTTL: number;
  throttlerLimit: number;
  authDomain: string | undefined;
  authAudience: string | undefined;
}
