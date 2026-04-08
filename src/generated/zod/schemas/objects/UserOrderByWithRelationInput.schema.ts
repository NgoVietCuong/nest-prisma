import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      username: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      password: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
      avatar: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
      role: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      emailVerified: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      deletedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    })
    .strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
