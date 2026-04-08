import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { UserStatusSchema } from '../enums/UserStatus.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumRoleFilterObjectSchema } from './EnumRoleFilter.schema';
import { EnumUserStatusFilterObjectSchema } from './EnumUserStatusFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';

const userwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
    username: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    password: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    avatar: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    role: z.union([z.lazy(() => EnumRoleFilterObjectSchema), RoleSchema]).optional(),
    status: z.union([z.lazy(() => EnumUserStatusFilterObjectSchema), UserStatusSchema]).optional(),
    emailVerified: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    deletedAt: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> =
  userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;
