import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionResponseDto } from 'src/common/dto';
import { ERROR_RESPONSE } from 'src/shared/constants';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;
    const httpStatus = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody: Partial<HttpExceptionResponseDto> = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    }

    if (isHttpException) {
      const exceptionResponse = exception.getResponse() as HttpExceptionResponseDto;
      Object.assign(responseBody, exceptionResponse);
    } else {
      Object.assign(responseBody, {...ERROR_RESPONSE.INTERNAL_SERVER_ERROR, details: exception});
    }

    // Remove error details in production
    const isProductionEnv = this.configService.get<string>('app.isProductionEnv');
    isProductionEnv && delete responseBody.details;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}