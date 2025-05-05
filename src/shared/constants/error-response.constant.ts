import { HttpStatus } from '@nestjs/common';

export const ERROR_RESPONSE = {
  // General
  INTERNAL_SERVER_ERROR: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: `Internal Server Error`,
  },
  UNAUTHORIZED: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 'UNAUTHORIZED',
    message: 'Authentication required',
  },
  BAD_REQUEST: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'BAD_REQUEST',
    message: `Bad Request`,
  },
  INVALID_CREDENTIALS: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 'INVALID_CREDENTIALS',
    message: `Authentication failed`,
  },
  RESOURCE_FORBIDDEN: {
    statusCode: HttpStatus.FORBIDDEN,
    errorCode: 'RESOURCE_FORBIDDEN',
    message: 'Access denied',
  },
  RESOURCE_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: 'RESOURCE_NOT_FOUND',
    message: 'Resource not found',
  },
  REQUEST_PAYLOAD_VALIDATION_ERROR: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errorCode: 'REQUEST_PAYLOAD_VALIDATION_ERROR',
    message: 'Invalid request payload data',
  },
  // Authentication
  USER_ALREADY_EXISTS: {
    statusCode: HttpStatus.CONFLICT,
    errorCode: 'USER_ALREADY_EXISTS',
    message: 'Unable to create account with provided credentials',
  },
  EMAIL_NOT_VERIFIED: {
    statusCode: HttpStatus.UNAUTHORIZED,
    errorCode: 'EMAIL_NOT_VERIFIED',
    message: 'Email not verified',
  },
  USER_DEACTIVATED: {
    statusCode: HttpStatus.FORBIDDEN,
    errorCode: 'USER_DEACTIVATED',
    message: 'Account access denied',
  }
}