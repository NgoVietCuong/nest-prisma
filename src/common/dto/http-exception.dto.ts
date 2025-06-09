import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp?: string;

  @ApiProperty()
  path?: string;

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  details?: object;
}
