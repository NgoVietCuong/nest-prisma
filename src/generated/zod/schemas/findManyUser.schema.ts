import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';
import { UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindManySelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    avatar: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindManySelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    email: z.boolean().optional(),
    password: z.boolean().optional(),
    avatar: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
  })
  .strict();

export const UserFindManySchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserFindManySelectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UserFindManyArgs>;

export const UserFindManyZodSchema = z
  .object({
    select: UserFindManySelectSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputObjectSchema,
        UserOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: UserWhereInputObjectSchema.optional(),
    cursor: UserWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();
