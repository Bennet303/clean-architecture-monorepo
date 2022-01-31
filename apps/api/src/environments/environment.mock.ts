import { IEnvironment } from './interface.environment';

// Configuration for local environment using mock data
export const environment: IEnvironment = {
  name: 'mock',
  production: false,
  local: true,
  useMockData: true,
  corsOrigin: 'http://localhost:4200',
  throttlerTTL: 60,
  throttlerLimit: 10,
  authDomain: undefined,
  authAudience: undefined,
};
