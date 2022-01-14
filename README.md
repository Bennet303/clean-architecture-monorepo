# CleanArchitectureMonorepo

This project gives the basic structure and functionality for a mono repository Node.js Web Application using clean architecture and best practices. The frontend is using Angular and Ionic and the API is using Nest.js.

The whole project is using NX to enable multiple projects in one repository.

The frontend project also includes Storybook for maintaining a component library, Cypress for E2E tests and Transloco for internationalization.

The API/backend includes Swagger-UI for API documentation.

For quality purposes strict linting rules are enabled.

To enable a better collaboration the repository also includes VS Code settings and recommended extensions for VS Code.

## Install dependencies

`npm install`

## Development server

Frontend:
`nx serve frontend`

Backend:
`nx serve backend`

## Build

Frontend:
`nx build frontend`

## Running unit tests

Frontend:
`nx test frontend`

Backend:
`nx test backend`

# Storybook

## Generating Storybook Configuration

`nx g @nrwl/angular:storybook-configuration project-name`

## How to run storybook

For the Web-Frontend:
`nx run frontend:storybook`

For the Shared-Components:
`nx run shared-components:storybook`

# Cypress E2E test

## How to run E2E test

For the Web-Frontend:
`nx run frontend-e2e:e2e`
