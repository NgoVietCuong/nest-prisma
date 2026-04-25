import { Field, z } from 'src/shared/utilities';

export const HttpErrorSchema = z.object({
  statusCode: Field.number(),
  timestamp: Field.string(),
  path: Field.string(),
  errorCode: Field.string(),
  message: Field.string(),
  details: z.object({}).passthrough().optional(),
});
