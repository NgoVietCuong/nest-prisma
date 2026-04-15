import { createZodDto } from 'nestjs-zod';
import { SuccessResponseDto } from 'src/shared/dto';
import {
  LoginBodySchema,
  LoginResponseSchema,
  RefreshTokenBodySchema,
  RefreshTokenResponseSchema,
  SignUpBodySchema,
  SignUpResponseSchema,
} from '../schemas';

// ****************************** Internal Sign Up *****************************
export class SignUpBodyDto extends createZodDto(SignUpBodySchema) {}

export class SignUpResponseDto extends createZodDto(SignUpResponseSchema) {}

// ****************************** Internal Login ******************************
export class LoginBodyDto extends createZodDto(LoginBodySchema) {}

export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}

// ****************************** Refresh Token ******************************
export class RefreshTokenBodyDto extends createZodDto(RefreshTokenBodySchema) {}

export class RefreshTokenResponseDto extends createZodDto(RefreshTokenResponseSchema) {}

// ******************************* Logout ********************************
export class LogoutResponseDto extends SuccessResponseDto {}
