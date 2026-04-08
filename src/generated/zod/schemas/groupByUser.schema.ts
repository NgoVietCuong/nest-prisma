import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';
import { UserAvgAggregateInputObjectSchema } from './objects/UserAvgAggregateInput.schema';
import { UserCountAggregateInputObjectSchema } from './objects/UserCountAggregateInput.schema';
import { UserMaxAggregateInputObjectSchema } from './objects/UserMaxAggregateInput.schema';
import { UserMinAggregateInputObjectSchema } from './objects/UserMinAggregateInput.schema';
import { UserOrderByWithAggregationInputObjectSchema } from './objects/UserOrderByWithAggregationInput.schema';
import { UserScalarWhereWithAggregatesInputObjectSchema } from './objects/UserScalarWhereWithAggregatesInput.schema';
import { UserSumAggregateInputObjectSchema } from './objects/UserSumAggregateInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';

export const UserGroupBySchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputObjectSchema,
        UserOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserScalarFieldEnumSchema),
    _count: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
    _min: UserMinAggregateInputObjectSchema.optional(),
    _max: UserMaxAggregateInputObjectSchema.optional(),
    _avg: UserAvgAggregateInputObjectSchema.optional(),
    _sum: UserSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserGroupByArgs>;

export const UserGroupByZodSchema = z
  .object({
    where: UserWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputObjectSchema,
        UserOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UserScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UserScalarFieldEnumSchema),
    _count: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
    _min: UserMinAggregateInputObjectSchema.optional(),
    _max: UserMaxAggregateInputObjectSchema.optional(),
    _avg: UserAvgAggregateInputObjectSchema.optional(),
    _sum: UserSumAggregateInputObjectSchema.optional(),
  })
  .strict();
