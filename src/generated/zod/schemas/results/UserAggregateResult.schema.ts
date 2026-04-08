import * as z from 'zod';

export const UserAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      username: z.number(),
      email: z.number(),
      password: z.number(),
      avatar: z.number(),
      role: z.number(),
      status: z.number(),
      emailVerified: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      deletedAt: z.number(),
    })
    .optional(),
  _sum: z
    .object({
      id: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _avg: z
    .object({
      id: z.number().nullable(),
    })
    .nullable()
    .optional(),
  _min: z
    .object({
      id: z.number().int().nullable(),
      username: z.string().nullable(),
      email: z.string().nullable(),
      password: z.string().nullable(),
      avatar: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
      deletedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.number().int().nullable(),
      username: z.string().nullable(),
      email: z.string().nullable(),
      password: z.string().nullable(),
      avatar: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
      deletedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
