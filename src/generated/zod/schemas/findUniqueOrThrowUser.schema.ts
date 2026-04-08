import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserFindUniqueOrThrowSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
  .object({ select: UserSelectObjectSchema.optional(), where: UserWhereUniqueInputObjectSchema })
  .strict() as unknown as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const UserFindUniqueOrThrowZodSchema = z
  .object({ select: UserSelectObjectSchema.optional(), where: UserWhereUniqueInputObjectSchema })
  .strict();
