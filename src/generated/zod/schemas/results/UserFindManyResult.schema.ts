import * as z from 'zod';

export const UserFindManyResultSchema = z.object({
  data: z.array(
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
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
