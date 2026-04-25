import { createZodDto } from 'nestjs-zod';
import { HttpErrorSchema } from 'src/shared/schemas';

export class HttpErrorResponseDto extends createZodDto(HttpErrorSchema) {}
