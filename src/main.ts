import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/common/docs/swagger';
import { AllExceptionFilter } from 'src/common/exceptions';
import { winstonConfig } from 'src/common/logger/logger.config';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { getAppConfig } from 'config';
import { PayloadValidationPipe } from 'src/common/pipes/payload-validation.pipe';

async function bootstrap() {
  const { appName, appPort } = getAppConfig();
  const logger = WinstonModule.createLogger(winstonConfig(appName));

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const reflector = app.get(Reflector);
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(
    new PayloadValidationPipe()
  );
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, configService));
  app.useGlobalInterceptors(new TransformInterceptor(reflector), new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app);
  await app.listen(appPort);

  logger.log({
    message: `Application is ready. View Swagger at http://localhost:${appPort}/api/docs`,
    context: 'Application',
  });
}

bootstrap();
