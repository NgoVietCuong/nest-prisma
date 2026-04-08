import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserCreateManyInputObjectSchema } from './objects/UserCreateManyInput.schema';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';

export const UserCreateManyAndReturnSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z
  .object({
    select: UserSelectObjectSchema.optional(),
    data: z.union([UserCreateManyInputObjectSchema, z.array(UserCreateManyInputObjectSchema)]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserCreateManyAndReturnArgs>;

export const UserCreateManyAndReturnZodSchema = z
  .object({
    select: UserSelectObjectSchema.optional(),
    data: z.union([UserCreateManyInputObjectSchema, z.array(UserCreateManyInputObjectSchema)]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
