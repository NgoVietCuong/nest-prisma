import { HttpStatus } from '@nestjs/common';
import { capitalize } from 'lodash';

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
  UNPROCESSABLE_ENTITY: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errorCode: 'unprocessable_entity',
    message: `Unprocessable entity`,
  },
  REQUEST_PAYLOAD_VALIDATION_ERROR: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errorCode: 'REQUEST_PAYLOAD_VALIDATION_ERROR',
    message: 'Invalid request payload data',
  },
  INVALID_FILES: {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'invalid_files',
    message: `Invalid files`,
  },
  OBJECT_NOT_FOUND: (objectName: string) => {
    const errorCodeFormat = objectName.replace(' ', '_').toLowerCase();
    return {
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: `${errorCodeFormat}_not_found`,
      message: `${objectName} not found.`,
    };
  },
  DUPLICATE_RESOURCE: (objectName: string) => {
    const errorCodeFormat = objectName.replace(' ', '_').toLowerCase();
    const messageFormat = capitalize(objectName.replace(/_/g, ' '));
    return {
      statusCode: HttpStatus.CONFLICT,
      errorCode: `${errorCodeFormat}_already_exists`,
      message: `${messageFormat} already exists.`,
    };
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
  },
  INVALID_TOKEN_USAGE: {
    statusCode: HttpStatus.FORBIDDEN,
    errorCode: 'INVALID_TOKEN_USAGE',
    message: 'Invalid token type',
  },
};
