import { Field, z } from 'src/shared/utilities';

export const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password cannot exceed 20 characters')
  .refine((val) => /[A-Z]/.test(val), 'Must contain at least one uppercase letter')
  .refine((val) => /[a-z]/.test(val), 'Must contain at least one lowercase letter')
  .refine((val) => /[0-9]/.test(val), 'Must contain at least one number')
  .refine((val) => /[!@#$%^&*]/.test(val), 'Must contain at least one special character');

export const SignUpBodySchema = z.object({
  username: Field.string({ required: true, min: 3, max: 20 }),
  email: Field.email({ required: true }),
  password: PasswordSchema,
});

export const SignUpResponseSchema = z.object({
  accessToken: Field.string({ required: true }),
  refreshToken: Field.string({ required: true }),
});

export const LoginBodySchema = SignUpBodySchema.pick({
  email: true,
  password: true,
});

export const LoginResponseSchema = SignUpResponseSchema;

export const RefreshTokenBodySchema = z.object({
  refreshToken: Field.string({ required: true }),
});

export const RefreshTokenResponseSchema = z.object({
  accessToken: Field.string({ required: true }),
});
