import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      username: z.boolean().optional(),
      email: z.boolean().optional(),
      password: z.boolean().optional(),
      avatar: z.boolean().optional(),
      role: z.boolean().optional(),
      status: z.boolean().optional(),
      emailVerified: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      deletedAt: z.boolean().optional(),
    })
    .strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
