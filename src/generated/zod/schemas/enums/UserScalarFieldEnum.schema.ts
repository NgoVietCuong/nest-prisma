import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'username',
  'email',
  'password',
  'avatar',
  'role',
  'status',
  'emailVerified',
  'createdAt',
  'updatedAt',
  'deletedAt',
]);

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;
