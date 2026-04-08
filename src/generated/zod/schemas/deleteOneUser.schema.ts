import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserDeleteOneSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({ select: UserSelectObjectSchema.optional(), where: UserWhereUniqueInputObjectSchema })
  .strict() as unknown as z.ZodType<Prisma.UserDeleteArgs>;

export const UserDeleteOneZodSchema = z
  .object({ select: UserSelectObjectSchema.optional(), where: UserWhereUniqueInputObjectSchema })
  .strict();
