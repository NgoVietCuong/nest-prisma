import { createZodDto } from 'nestjs-zod';
import {
  CursorPaginationQuerySchema,
  CursorPaginationResponseSchema,
  PaginationQuerySchema,
  PaginationResponseSchema,
} from 'src/shared/schemas';
import { z } from 'src/shared/utilities';

// ---------------------- Cursor Pagination Dto -----------------------
export class CursorPaginationQueryDto extends createZodDto(CursorPaginationQuerySchema) {}

export class CursorPaginationResponseDto<T> extends createZodDto(
  CursorPaginationResponseSchema(z.any()),
) {
  declare data: T[];
}

// ******************* DTO Classes for NestJS + Swagger *******************
export class PaginationQueryDto extends createZodDto(PaginationQuerySchema) {}

export class PaginationResponseDto<T> extends createZodDto(PaginationResponseSchema(z.any())) {
  declare data: T[];
}
