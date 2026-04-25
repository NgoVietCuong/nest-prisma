import { z } from 'zod';

/**
 * Helper to make a schema optional or required based on flag
 */
const wrapOptional = <T extends z.ZodTypeAny>(schema: T, required: boolean): any => {
  return required ? schema : schema.optional();
};

// ==================== Main Field Builder ====================
export const Field = {
  /** String field */
  string: (opts: { required?: boolean; default?: string; min?: number; max?: number } = {}) => {
    let schema = z.string({ required_error: 'This field is required' });

    if (opts.min !== undefined) schema = schema.min(opts.min);
    if (opts.max !== undefined) schema = schema.max(opts.max);

    const finalSchema = opts.default !== undefined ? schema.default(opts.default) : schema;
    return wrapOptional(finalSchema, !!opts.required);
  },

  /** Number field */
  number: (opts: { required?: boolean; default?: number; min?: number; max?: number } = {}) => {
    let schema = z.number({ required_error: 'This field is required' }).int();

    if (opts.min !== undefined) schema = schema.min(opts.min);
    if (opts.max !== undefined) schema = schema.max(opts.max);

    const finalSchema = opts.default !== undefined ? schema.default(opts.default) : schema;

    return wrapOptional(finalSchema, !!opts.required);
  },

  /** Boolean */
  boolean: (opts: { required?: boolean; default?: boolean } = {}) => {
    const schema = z.boolean();
    const finalSchema = opts.default !== undefined ? schema.default(opts.default) : schema;

    return wrapOptional(finalSchema, !!opts.required);
  },

  /** Date */
  date: (opts: { required?: boolean } = {}) =>
    wrapOptional(z.date({ required_error: 'Invalid date format' }), !!opts.required),

  /** UUID */
  uuid: (opts: { required?: boolean } = {}) =>
    wrapOptional(z.string().uuid('Invalid UUID format'), !!opts.required),

  /** Email */
  email: (opts: { required?: boolean } = {}) =>
    wrapOptional(z.string().email('Invalid email address'), !!opts.required),

  /** Enum */
  enum: <T extends readonly [string, ...string[]]>(
    values: T,
    opts: { required?: boolean; default?: T[number] } = {},
  ) => {
    const schema = z.enum(values);
    const finalSchema = opts.default !== undefined ? schema.default(opts.default) : schema;

    return wrapOptional(finalSchema, !!opts.required);
  },

  /** Array */
  array: <T extends z.ZodTypeAny>(item: T, opts: { required?: boolean; min?: number } = {}) => {
    const schema = z.array(item).min(opts.min ?? 0);
    return wrapOptional(schema, !!opts.required);
  },

  /** Nested DTO (single object) */
  dto: <T extends z.ZodRawShape>(shape: T, opts: { required?: boolean } = {}) => {
    const schema = z.object(shape).strict();
    return wrapOptional(schema, !!opts.required);
  },

  /** Nested DTO Array */
  dtoArray: <T extends z.ZodRawShape>(
    shape: T,
    opts: { required?: boolean; min?: number } = {},
  ) => {
    const schema = z.array(z.object(shape).strict()).min(opts.min ?? 0);
    return wrapOptional(schema, !!opts.required);
  },
  /** File upload */
  file: () => z.any().optional(),
};

export { z };
