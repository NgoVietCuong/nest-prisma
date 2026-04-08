import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { NestedBoolFilterObjectSchema } from './NestedBoolFilter.schema';
import { NestedBoolWithAggregatesFilterObjectSchema } from './NestedBoolWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';

const makeSchema = () =>
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterObjectSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
    })
    .strict();
export const BoolWithAggregatesFilterObjectSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.BoolWithAggregatesFilter>;
export const BoolWithAggregatesFilterObjectZodSchema = makeSchema();
