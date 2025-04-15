import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator';

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(result => {
        const status = context.switchToHttp().getResponse().statusCode;

        const message =
          this.reflector.get<string>(
            RESPONSE_MESSAGE_METADATA,
            context.getHandler(),
          ) || 'Success';

        return {
          status,
          message,
          data: result || {},
        };
      }),
    );
  }
}