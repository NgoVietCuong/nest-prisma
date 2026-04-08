import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { UserStatusSchema } from '../enums/UserStatus.schema';

const makeSchema = () =>
  z
    .object({
      username: z.string(),
      email: z.string(),
      password: z.string().optional().nullable(),
      avatar: z.string().optional().nullable(),
      role: RoleSchema.optional(),
      status: UserStatusSchema.optional(),
      emailVerified: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      deletedAt: z.coerce.date().optional().nullable(),
    })
    .strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
