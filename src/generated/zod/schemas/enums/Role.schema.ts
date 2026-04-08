import * as z from 'zod';

export const RoleSchema = z.enum(['Admin', 'User']);

export type Role = z.infer<typeof RoleSchema>;
