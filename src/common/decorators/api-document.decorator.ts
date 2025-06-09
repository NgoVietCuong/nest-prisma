// import { applyDecorators, HttpStatus } from '@nestjs/common';
// import {
//   ApiOperation,
//   ApiBody,
//   ApiResponse,
//   ApiParam,
//   ApiQuery,
//   ApiTags,
//   ApiOperationOptions,
//   ApiBodyOptions,
//   ApiResponseOptions
// } from '@nestjs/swagger';
//
// /**
//  * Custom decorator for Swagger documentation in NestJS
//  * @param options Configuration options for the Swagger decorator
//  * @returns Decorator functions
//  */
//
// export interface ApiDocParam {
//   name: string;
//   type: string;
//   required?: boolean;
//   description?: string;
//   example?: any;
// }
//
// /**
//  * Type definition for response example
//  */
// export interface ApiDocExample {
//   value: any;
//   summary?: string;
//   description?: string;
// }
//
// export interface ApiDocBody {
//   type: any;
//   description?: string;
//   required?: boolean;
//   examples?: Record<string, ApiDocExample>;
// }
//
// export interface ApiDocResponse {
//   type: any;
//   isArray?: boolean;
//   description: string;
//   examples?: Record<string, ApiDocExample>;
// }
//
// export interface ApiDocumentOptions {
//   operation: ApiOperationOptions;
//   body: ApiBodyOptions,
//   response:
// }
// //
// // export interface ApiOperationOptions {
// //   summary: string;
// //   operationId: string;
// // }
//
// export function SwaggerApiDocument(options: {
//   operation: ApiOperationOptions
//   summary: string;
//   description?: string;
//   tags?: string[];
//   body?: {
//     type: any;
//     description?: string;
//     required?: boolean;
//     examples?: Record<string, { value: any; summary?: string; description?: string }>;
//   };
//   params?: Array<{
//     name: string;
//     type: string;
//     required?: boolean;
//     description?: string;
//     example?: any;
//   }>;
//   queries?: Array<{
//     name: string;
//     type: string;
//     required?: boolean;
//     description?: string;
//     example?: any;
//   }>;
//   responses: Record<
//     number,
//     {
//       type: any;
//       description: string;
//       examples?: Record<string, { value: any; summary?: string; description?: string }>;
//     }
//   >;
// }) {
//
//
//   const decorators: (MethodDecorator | ClassDecorator)[] = [
//     ApiResponse({
//       status: HttpStatus.INTERNAL_SERVER_ERROR,
//       description: 'Oops, something went wrong',
//       type: HttpErrorResponseDto,
//     }),
//     ApiResponse({
//       status: HttpStatus.BAD_REQUEST,
//       description: 'Bad Request',
//     }),
//     ApiResponse({
//       status: HttpStatus.UNPROCESSABLE_ENTITY,
//       description: 'Validate request payload error',
//     }),
//   ];
//
//
//   return applyDecorators(...decorators);
// }
