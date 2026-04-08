import * as z from 'zod';

export const UserDeleteResultSchema = z.nullable(
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string(),
    password: z.string().optional(),
    avatar: z.string().optional(),
    role: z.unknown(),
    status: z.unknown(),
    emailVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional(),
  }),
);
