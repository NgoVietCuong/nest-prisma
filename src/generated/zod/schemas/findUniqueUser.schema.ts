import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserFindUniqueSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({ select: UserSelectObjectSchema.optional(), where: UserWhereUniqueInputObjectSchema })
  .strict() as unknown as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueZodSchema = z
  .object({ select: UserSelectObjectSchema.optional(), where: UserWhereUniqueInputObjectSchema })
  .strict();
