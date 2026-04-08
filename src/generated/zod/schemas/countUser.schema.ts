import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserCountAggregateInputObjectSchema } from './objects/UserCountAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserCountSchema: z.ZodType<Prisma.UserCountArgs> = z
  .object({
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserCountArgs>;

export const UserCountZodSchema = z
  .object({
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), UserCountAggregateInputObjectSchema]).optional(),
  })
  .strict();
