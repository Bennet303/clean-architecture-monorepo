import { IEnvironment } from './interface.environment';

// Configuration for the dev server
export const environment: IEnvironment = {
  name: 'dev',
  production: false,
  local: false,
  useMockData: false,
  corsOrigin: process.env.FRONTEND_URI,
  throttlerTTL: parseInt(process.env.THROTTLER_TTL ?? '60'),
  throttlerLimit: parseInt(process.env.THROTTLER_LIMIT ?? '10'),
  authDomain: process.env.AUTH_DOMAIN,
  authAudience: process.env.AUTH_AUDIENCE,
  databaseHost: 'localhost',
  databasePort: 3306,
  databaseUsername: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: 'Monorepo',
};
