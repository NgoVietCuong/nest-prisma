import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserAvgOrderByAggregateInputObjectSchema } from './UserAvgOrderByAggregateInput.schema';
import { UserCountOrderByAggregateInputObjectSchema } from './UserCountOrderByAggregateInput.schema';
import { UserMaxOrderByAggregateInputObjectSchema } from './UserMaxOrderByAggregateInput.schema';
import { UserMinOrderByAggregateInputObjectSchema } from './UserMinOrderByAggregateInput.schema';
import { UserSumOrderByAggregateInputObjectSchema } from './UserSumOrderByAggregateInput.schema';

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
      _count: z.lazy(() => UserCountOrderByAggregateInputObjectSchema).optional(),
      _avg: z.lazy(() => UserAvgOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputObjectSchema).optional(),
      _sum: z.lazy(() => UserSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const UserOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithAggregationInput>;
export const UserOrderByWithAggregationInputObjectZodSchema = makeSchema();
