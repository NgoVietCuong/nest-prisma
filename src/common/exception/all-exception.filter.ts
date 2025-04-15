import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;
    const httpStatus =
      isHttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = isHttpException ? exception.getResponse()['error'] : null;

    const responseBody = {
      statusCode: httpStatus,
      ...(isHttpException && { error }),
      message: isHttpException
        ? exception.getResponse()['message'] || exception.message
        : 'Internal server error',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}