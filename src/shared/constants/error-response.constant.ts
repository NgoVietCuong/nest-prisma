import { HttpStatus } from '@nestjs/common';

export const ERROR_RESPONSE = {
  INTERNAL_SERVER_ERROR: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: `Internal Server Error`,
  },
  USER_ALREADY_EXISTS: {
    statusCode: HttpStatus.CONFLICT,
    errorCode: 'USER_ALREADY_EXISTS',
    message: 'Unable to create account with provided credentials',
  },
  REQUEST_PAYLOAD_VALIDATION_ERROR: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errorCode: 'REQUEST_PAYLOAD_VALIDATION_ERROR',
    message: 'Invalid request payload data',
  },
}