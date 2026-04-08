import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { UserStatusSchema } from '../enums/UserStatus.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EnumRoleFieldUpdateOperationsInputObjectSchema } from './EnumRoleFieldUpdateOperationsInput.schema';
import { EnumUserStatusFieldUpdateOperationsInputObjectSchema } from './EnumUserStatusFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      username: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      email: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      avatar: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
        .optional()
        .nullable(),
      role: z
        .union([RoleSchema, z.lazy(() => EnumRoleFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      status: z
        .union([
          UserStatusSchema,
          z.lazy(() => EnumUserStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      emailVerified: z
        .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      createdAt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      updatedAt: z
        .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
        .optional(),
      deletedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();
export const UserUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateInput>;
export const UserUncheckedUpdateInputObjectZodSchema = makeSchema();
