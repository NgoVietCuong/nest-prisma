import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserCreateInputObjectSchema } from './objects/UserCreateInput.schema';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserUncheckedCreateInputObjectSchema } from './objects/UserUncheckedCreateInput.schema';
import { UserUncheckedUpdateInputObjectSchema } from './objects/UserUncheckedUpdateInput.schema';
import { UserUpdateInputObjectSchema } from './objects/UserUpdateInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserUpsertOneSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
    create: z.union([UserCreateInputObjectSchema, UserUncheckedCreateInputObjectSchema]),
    update: z.union([UserUpdateInputObjectSchema, UserUncheckedUpdateInputObjectSchema]),
  })
  .strict() as unknown as z.ZodType<Prisma.UserUpsertArgs>;

export const UserUpsertOneZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    where: UserWhereUniqueInputObjectSchema,
    create: z.union([UserCreateInputObjectSchema, UserUncheckedCreateInputObjectSchema]),
    update: z.union([UserUpdateInputObjectSchema, UserUncheckedUpdateInputObjectSchema]),
  })
  .strict();
