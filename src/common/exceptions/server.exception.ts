import { HttpException, HttpStatus } from '@nestjs/common';
import type { HttpExceptionResponseDto } from 'src/common/dto';

export class ServerException extends HttpException {
  constructor(response: HttpExceptionResponseDto, status?: number) {
    const statusCode: number =
      status || response.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    super({ ...response }, statusCode);
  }
}