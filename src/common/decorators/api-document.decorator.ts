import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

/**
 * Custom decorator for Swagger documentation in NestJS
 * @param options Configuration options for the Swagger decorator
 * @returns Decorator functions
 */

export interface ApiDocParam {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  example?: any;
}

/**
 * Type definition for response example
 */
export interface ApiDocExample {
  value: any;
  summary?: string;
  description?: string;
}

export interface ApiDocBody {
  type: any;
  description?: string;
  required?: boolean;
  examples?: Record<string, ApiDocExample>;
}

export interface ApiDocResponse {
  type: any;
  isArray?: boolean;
  description: string;
  examples?: Record<string, ApiDocExample>;
}

export interface ApiDocOptions {
  summary: string;
  description?: string;
  tags?: string[];
  body?: ApiDocBody;
  params?: ApiDocParam[];
  queries?: ApiDocParam[];
  responses: Record<number, ApiDocResponse>;
}

export function SwaggerApiDocument(options: {
  summary: string;
  description?: string;
  tags?: string[];
  body?: {
    type: any;
    description?: string;
    required?: boolean;
    examples?: Record<string, { value: any; summary?: string; description?: string }>;
  };
  params?: Array<{
    name: string;
    type: string;
    required?: boolean;
    description?: string;
    example?: any;
  }>;
  queries?: Array<{
    name: string;
    type: string;
    required?: boolean;
    description?: string;
    example?: any;
  }>;
  responses: Record<
    number,
    {
      type: any;
      description: string;
      examples?: Record<string, { value: any; summary?: string; description?: string }>;
    }
  >;
}) {
  // Prepare decorators array
  const decorators: (MethodDecorator | ClassDecorator)[] = [
    ApiOperation(operation),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Oops, something went wrong',
      type: HttpErrorResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request',
    }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Validate request payload error',
    }),
  ];

  // Add ApiTags if provided
  if (options.tags?.length) {
    decorators.push(ApiTags(...options.tags));
  }

  // Add ApiOperation with summary and description
  decorators.push(
    ApiOperation({
      summary: options.summary,
      description: options.description || options.summary,
    }),
  );

  // Add request body documentation if provided
  if (options.body) {
    decorators.push(
      ApiBody({
        type: options.body.type,
        description: options.body.description,
        required: options.body.required !== false, // Default to true if not specified
        examples: options.body.examples,
      }),
    );
  }

  // Add URL parameters if provided
  if (options.params?.length) {
    options.params.forEach((param) => {
      decorators.push(
        ApiParam({
          name: param.name,
          type: param.type,
          required: param.required !== false, // Default to true if not specified
          description: param.description,
          example: param.example,
        }),
      );
    });
  }

  // Add query parameters if provided
  if (options.queries?.length) {
    options.queries.forEach((query) => {
      decorators.push(
        ApiQuery({
          name: query.name,
          type: query.type,
          required: query.required !== false, // Default to true if not specified
          description: query.description,
          example: query.example,
        }),
      );
    });
  }

  // Add response documentation
  Object.entries(options.responses).forEach(([statusCode, response]) => {
    decorators.push(
      ApiResponse({
        status: parseInt(statusCode),
        type: response.type,
        description: response.description,
        examples: response.examples,
      }),
    );
  });

  return applyDecorators(...decorators);
}