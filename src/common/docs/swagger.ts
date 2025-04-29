import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from 'config';

export const setupSwagger = (app: INestApplication) => {
  const { appName, nodeEnv } = appConfig();
  if (nodeEnv === 'production') return;

  const config = new DocumentBuilder()
    .setTitle(`${appName} Documentation Swagger`)
    .setDescription(`${appName} Description`)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      customSiteTitle: `${appName} API Documentation`,
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
    }
  });
}