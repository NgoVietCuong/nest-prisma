import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { setupSwagger } from 'src/common/docs';
import { AllExceptionFilter } from 'src/common/exceptions';
import { TransformInterceptor } from 'src/common/interceptors';
import { PayloadValidationPipe } from 'src/common/pipes';
import { getAppConfig } from 'src/config';
import { winstonConfig } from 'src/infrastructure/logger';
import { AppModule } from './app.module';

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

  if (!isProductionEnv) {
    logger.log({
      message: `Application is ready. View Swagger at http://localhost:${appPort}/api/docs`,
      context: 'Application',
    });
  }
}

void bootstrap();
