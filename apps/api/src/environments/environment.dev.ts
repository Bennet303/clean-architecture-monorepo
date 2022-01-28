// Configuration for the dev server
export const environment = {
  name: 'dev',
  production: false,
  local: false,
  useMockData: false,
  cors_origin: process.env.FRONTEND_URI,
  throttlerTTL: process.env.THROTTLER_TTL ?? 60,
  throttlerLimit: process.env.THROTTLER_LIMIT ?? 10,
  keycloakRealm: process.env.KEYCLOAK_REALM,
  keycloakBaseUrl: process.env.KEYCLOAK_BASE_URL,
  auth0Domain: process.env.AUTH0_DOMAIN,
  auth0Audience: process.env.AUTH0_AUDIENCE,
};
