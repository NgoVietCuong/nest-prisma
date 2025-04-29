import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/common/docs/swagger';
import { AllExceptionFilter } from 'src/common/exception/all-exception.filter';
import { winstonConfig } from 'src/common/logger/logger.config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { appConfig } from 'config';

async function bootstrap() {
  const { appName, appPort } = appConfig();
  const logger = WinstonModule.createLogger(winstonConfig(appName));

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const reflector = app.get(Reflector);
  const httpAdapter = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor(reflector), new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app);
  await app.listen(appPort);

  logger.log({
    message: `Application is ready. View Swagger at http://localhost:${appPort}/api/docs`,
    context: 'Application',
  });
}

bootstrap();
