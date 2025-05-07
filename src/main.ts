import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionFilter } from 'src/common/exceptions';
import { TransformInterceptor } from 'src/common/interceptors';
import { PayloadValidationPipe } from 'src/common/pipes';
import { setupSwagger } from 'src/common/docs';
import { winstonConfig } from 'src/common/logger';
import { getAppConfig } from 'config';

async function bootstrap() {
  const { appName, appPort, isProductionEnv } = getAppConfig();
  const logger = WinstonModule.createLogger(winstonConfig(appName));

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const reflector = app.get(Reflector);
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new PayloadValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, configService));
  app.useGlobalInterceptors(new TransformInterceptor(reflector), new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app);
  await app.listen(appPort);

  !isProductionEnv &&
    logger.log({
      message: `Application is ready. View Swagger at http://localhost:${appPort}/api/docs`,
      context: 'Application',
    });
}

bootstrap();
