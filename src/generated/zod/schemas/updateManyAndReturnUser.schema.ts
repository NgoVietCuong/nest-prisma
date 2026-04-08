import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserUpdateManyMutationInputObjectSchema } from './objects/UserUpdateManyMutationInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';

export const UserUpdateManyAndReturnSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    data: UserUpdateManyMutationInputObjectSchema,
    where: UserWhereInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserUpdateManyAndReturnArgs>;

export const UserUpdateManyAndReturnZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    data: UserUpdateManyMutationInputObjectSchema,
    where: UserWhereInputObjectSchema.optional(),
  })
  .strict();
