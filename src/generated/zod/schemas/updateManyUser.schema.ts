import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserUpdateManyMutationInputObjectSchema } from './objects/UserUpdateManyMutationInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';

export const UserUpdateManySchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: UserUpdateManyMutationInputObjectSchema,
    where: UserWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserUpdateManyZodSchema = z
  .object({
    data: UserUpdateManyMutationInputObjectSchema,
    where: UserWhereInputObjectSchema.optional(),
  })
  .strict();
