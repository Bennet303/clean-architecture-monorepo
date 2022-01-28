/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { metaInformation } from './meta.information';
import { KeycloakAuthGuard } from './app/features/auth/guards/keycloak.auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI, //! has to been called before the Swagger Document is build
  });

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: !environment.local, //! change to 'true' for production
      transform: true,
    })
  );

  app.useGlobalGuards(new KeycloakAuthGuard());

  if (environment.local) setupSwagger(app, globalPrefix);

  const port = process.env.PORT || 3333;

  await app.listen(port, () => {
    Logger.log(`Application is starting in ${environment.name} mode...`);
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

function setupSwagger(app: INestApplication, globalPrefix: string) {
  const config = new DocumentBuilder()
    .setTitle(metaInformation.title)
    .setDescription(metaInformation.description)
    .setVersion(metaInformation.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
}

bootstrap();
