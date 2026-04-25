import { createZodDto } from 'nestjs-zod';
import { SuccessResponseSchema } from 'src/shared/schemas';

export class SuccessResponseDto extends createZodDto(SuccessResponseSchema) {}
