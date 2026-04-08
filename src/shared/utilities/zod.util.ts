import { z } from 'zod';

/**
 * Helper to make a schema optional or required based on flag
 */
const optionalIf = <T extends z.ZodTypeAny>(
  schema: T,
  condition: boolean,
): T | z.ZodOptional<T> => {
  return condition ? schema : schema.optional();
};

// ==================== Main Field Builder ====================
export const Field = {
  /** String field */
  string: (opts: { required?: boolean; default?: string; min?: number; max?: number } = {}) => {
    let schema = z.string({ required_error: 'This field is required' });
    if (opts.min !== undefined) schema = schema.min(opts.min);
    if (opts.max !== undefined) schema = schema.max(opts.max);

    return optionalIf(schema.default(opts.default ?? ''), !opts.required);
  },

  /** Number field */
  number: (opts: { required?: boolean; default?: number; min?: number; max?: number } = {}) => {
    let schema = z.number({ required_error: 'This field is required' }).int();
    if (opts.min !== undefined) schema = schema.min(opts.min);
    if (opts.max !== undefined) schema = schema.max(opts.max);

    return optionalIf(schema.default(opts.default ?? 0), !opts.required);
  },

  /** Boolean */
  boolean: (opts: { required?: boolean; default?: boolean } = {}) =>
    optionalIf(z.boolean().default(opts.default ?? false), !opts.required),

  /** Date */
  date: (opts: { required?: boolean } = {}) =>
    optionalIf(z.date({ required_error: 'Invalid date format' }), !opts.required),

  /** UUID */
  uuid: (opts: { required?: boolean } = {}) =>
    optionalIf(z.string().uuid('Invalid UUID format'), !opts.required),

  /** Email */
  email: (opts: { required?: boolean } = {}) =>
    optionalIf(z.string().email('Invalid email address'), !opts.required),

  /** Enum */
  enum: <T extends readonly [string, ...string[]]>(
    values: T,
    opts: { required?: boolean; default?: T[number] } = {},
  ) => optionalIf(z.enum(values).default(opts.default!), !opts.required),

  /** Array */
  array: <T extends z.ZodTypeAny>(item: T, opts: { required?: boolean; min?: number } = {}) =>
    optionalIf(z.array(item).min(opts.min ?? 0), !opts.required),

  /** Nested DTO (single object) */
  dto: <T extends z.ZodRawShape>(shape: T, opts: { required?: boolean } = {}) =>
    optionalIf(z.object(shape).strict(), !opts.required),

  /** Nested DTO Array */
  dtoArray: <T extends z.ZodRawShape>(shape: T, opts: { required?: boolean; min?: number } = {}) =>
    optionalIf(z.array(z.object(shape).strict()).min(opts.min ?? 0), !opts.required),

  /** File upload */
  file: () => z.any().optional(),
};

export { z };
