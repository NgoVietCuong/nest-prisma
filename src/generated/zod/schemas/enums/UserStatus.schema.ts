import * as z from 'zod';

export const UserStatusSchema = z.enum(['Active', 'InActive']);

export type UserStatus = z.infer<typeof UserStatusSchema>;
