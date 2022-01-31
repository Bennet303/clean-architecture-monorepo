import { IEnvironment } from './interface.environment';

// Configuration for the prod server
export const environment: IEnvironment = {
  name: 'prod',
  production: true,
  local: false,
  useMockData: false,
  corsOrigin: process.env.FRONTEND_URI,
  throttlerTTL: parseInt(process.env.THROTTLER_TTL ?? '60'),
  throttlerLimit: parseInt(process.env.THROTTLER_LIMIT ?? '10'),
  authDomain: process.env.AUTH_DOMAIN,
  authAudience: process.env.AUTH_AUDIENCE,
};
