import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
import { UserStatusSchema } from '../../enums/UserStatus.schema';

// prettier-ignore
export const UserInputSchema = z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    password: z.string().optional().nullable(),
    avatar: z.string().optional().nullable(),
    role: RoleSchema,
    status: UserStatusSchema,
    emailVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional().nullable()
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
