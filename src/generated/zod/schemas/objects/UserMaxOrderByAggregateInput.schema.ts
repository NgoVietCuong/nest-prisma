import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      username: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: SortOrderSchema.optional(),
      avatar: SortOrderSchema.optional(),
      role: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      emailVerified: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      deletedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;
export const UserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
