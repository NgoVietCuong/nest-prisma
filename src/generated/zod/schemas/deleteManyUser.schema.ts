import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';

export const UserDeleteManySchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({ where: UserWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.UserDeleteManyArgs>;

export const UserDeleteManyZodSchema = z
  .object({ where: UserWhereInputObjectSchema.optional() })
  .strict();
