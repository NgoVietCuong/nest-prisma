import { Field, z } from 'src/shared/utilities';

export const PaginationQuerySchema = z.object({
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

export const PaginationMetadataSchema = z.object({
  page: Field.number({ required: true }),
  pageSize: Field.number({ required: true }),
  totalPages: Field.number({ required: true }),
  total: Field.number({ required: true }),
});

export const PaginationResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: Field.array(dataSchema),
    pagination: PaginationMetadataSchema,
  });

export const CursorPaginationQuerySchema = z.object({
  limit: Field.number({
    required: false,
    default: 20,
    min: 1,
  }),

  cursor: Field.string({
    required: false,
  }),
});

export const CursorPaginationResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    data: Field.array(dataSchema),
    nextCursor: Field.string({ required: false }),
    hasMore: Field.boolean({ required: false }),
  });
};
