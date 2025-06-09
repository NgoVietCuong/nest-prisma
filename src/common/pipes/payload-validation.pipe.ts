import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';
import { ServerException } from 'src/common/exceptions/server.exception';
import { ERROR_RESPONSE } from 'src/shared/constants';

@Injectable()
export class PayloadValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const getDetails = (acc: object, value: ValidationError) => {
          const { property, constraints } = value;

          if (constraints) {
            acc[property] = Object.values(constraints);
          }
          return acc;
        };
        return new ServerException({
          ...ERROR_RESPONSE.REQUEST_PAYLOAD_VALIDATION_ERROR,
          message: `Validation failed: ${errors.map((e) => e.property).join(', ')}`,
          details: errors.reduce(getDetails, {}),
        });
      },
    });
  }
}
