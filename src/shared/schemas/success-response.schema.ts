import { Field, z } from 'src/shared/utilities';

export const SuccessResponseSchema = z.object({
  success: Field.boolean(),
});
