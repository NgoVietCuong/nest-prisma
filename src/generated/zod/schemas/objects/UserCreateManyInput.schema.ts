import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { UserStatusSchema } from '../enums/UserStatus.schema';

const makeSchema = () =>
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      email: z.string(),
      password: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      role: RoleSchema.optional(),
      status: UserStatusSchema.optional(),
      emailVerified: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      deletedAt: z.coerce.date().optional().nullable(),
    })
    .strict();
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyInput>;
export const UserCreateManyInputObjectZodSchema = makeSchema();
