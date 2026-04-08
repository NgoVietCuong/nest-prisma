import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { UserStatusSchema } from '../enums/UserStatus.schema';
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumRoleWithAggregatesFilterObjectSchema } from './EnumRoleWithAggregatesFilter.schema';
import { EnumUserStatusWithAggregatesFilterObjectSchema } from './EnumUserStatusWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

const userscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
    username: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    password: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    avatar: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    role: z.union([z.lazy(() => EnumRoleWithAggregatesFilterObjectSchema), RoleSchema]).optional(),
    status: z
      .union([z.lazy(() => EnumUserStatusWithAggregatesFilterObjectSchema), UserStatusSchema])
      .optional(),
    emailVerified: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
      .optional(),
    deletedAt: z
      .union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict();
export const UserScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  userscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;
export const UserScalarWhereWithAggregatesInputObjectZodSchema =
  userscalarwherewithaggregatesinputSchema;
