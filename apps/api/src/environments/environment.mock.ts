// Configuration for local environment using mock data
export const environment = {
  name: 'mock',
  production: false,
  local: true,
  useMockData: true,
  cors_origin: 'http://localhost:4200',
  throttlerTTL: 60,
  throttlerLimit: 10,
};
