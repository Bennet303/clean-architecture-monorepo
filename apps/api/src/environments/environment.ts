import { IEnvironment } from './interface.environment';

// Configuration for local environment using real data
export const environment: IEnvironment = {
  name: 'local',
  production: false,
  local: true,
  useMockData: false,
  corsOrigin: 'http://localhost:4200',
  throttlerTTL: 60,
  throttlerLimit: 10,
  authDomain: undefined,
  authAudience: undefined,
};
