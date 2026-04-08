import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      username: z.literal(true).optional(),
      email: z.literal(true).optional(),
      password: z.literal(true).optional(),
      avatar: z.literal(true).optional(),
      role: z.literal(true).optional(),
      status: z.literal(true).optional(),
      emailVerified: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
      deletedAt: z.literal(true).optional(),
    })
    .strict();
export const UserMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserMaxAggregateInputType>;
export const UserMaxAggregateInputObjectZodSchema = makeSchema();
