import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { Field, z } from 'src/shared/utilities';

const PaginationQuerySchema = z.object({
  page: Field.number({
    required: false,
    default: 1,
    min: 1,
  }),

  pageSize: Field.number({
    required: true,
    default: 20,
    min: 1,
    max: 100,
  }),
});

const PaginationMetadataResponseSchema = z.object({
  page: Field.number({ required: true }),
  pageSize: Field.number({ required: true }),
  totalPages: Field.number({ required: true }),
  total: Field.number({ required: true }),
});

// ---------------------- Cursor Pagination Dto -----------------------
export class CursorPaginationQueryDto {
  @ApiProperty({
    type: Number,
    required: false,
    example: 20,
  })
  limit?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Next page cursor for pagination',
  })
  cursor?: string;
}

export class CursorPaginationResponseDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'The cursor for the next page. Null if there is no more data.',
  })
  nextCursor: string | null;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if there is more data to fetch.',
  })
  hasMore: boolean;
}

// ******************* DTO Classes for NestJS + Swagger *******************
export class PaginationQueryDto extends createZodDto(PaginationQuerySchema) {}

export class PaginationMetadataResponseDto extends createZodDto(PaginationMetadataResponseSchema) {}

export class PaginationResponseDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty({
    type: PaginationMetadataResponseDto,
  })
  pagination: PaginationMetadataResponseDto;
}
