import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(result => {
        const status = context.switchToHttp().getResponse().statusCode;

        if (result instanceof ApiResponse) {
          return {
            status,
            message: result.message,
            data: result.data
          };
        }

        return {
          status,
          message: 'Success',
          data: result
        };
      }),
    );
  }
}