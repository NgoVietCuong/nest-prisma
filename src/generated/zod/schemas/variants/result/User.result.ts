import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
import { UserStatusSchema } from '../../enums/UserStatus.schema';

// prettier-ignore
export const UserResultSchema = z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    password: z.string().nullable(),
    avatar: z.string().nullable(),
    role: RoleSchema,
    status: UserStatusSchema,
    emailVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable()
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
