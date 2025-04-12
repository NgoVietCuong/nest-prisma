import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/common/docs/swagger';
import { AllExceptionFilter } from 'src/common/exception/all-exception.filter';
import { winstonConfig } from 'src/common/logger/logger.config';

async function bootstrap() {
  const appName = process.env.USER_WEB_NAME || 'Nestjs Prisma';
  const app = await NestFactory.create(AppModule, {
    logger:  WinstonModule.createLogger(winstonConfig(appName))
  });
  const httpAdapter = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app, appName);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
