// Configuration for local environment using real data
export const environment = {
  name: 'local',
  production: false,
  local: true,
  useMockData: false,
  cors_origin: 'http://localhost:4200',
  throttlerTTL: 60,
  throttlerLimit: 10,
};
