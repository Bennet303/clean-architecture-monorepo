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
  databaseHost: string | undefined;
  databasePort: number | undefined;
  databaseUsername: string | undefined;
  databasePassword: string | undefined;
  databaseName: string | undefined;
}
