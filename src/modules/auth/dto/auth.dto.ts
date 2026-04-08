import { PickType } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { PropertyDto } from 'src/common/decorators';
import { SuccessResponseDto } from 'src/shared/dto';

// ****************************** Internal Sign Up *****************************
export class SignUpBodyDto {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'Cuong Ngo',
  })
  username: string;

  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'temporary001@email.com',
  })
  @IsEmail()
  email: string;

  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'NVC@007',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}

export class SignUpResponseDto {
  @PropertyDto()
  accessToken: string;

  @PropertyDto()
  refreshToken: string;
}

// ****************************** Internal Login ******************************
export class LoginBodyDto extends PickType(SignUpBodyDto, ['email'] as const) {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'Sota@001',
  })
  password: string;
}

export class LoginResponseDto extends SignUpResponseDto {}

// ****************************** Refresh Token ******************************
export class RefreshTokenBodyDto {
  @PropertyDto({
    type: String,
    required: true,
    validated: true,
    example: 'refresh.token',
  })
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @PropertyDto()
  accessToken: string;
}

// ******************************* Logout ********************************
export class LogoutResponseDto extends SuccessResponseDto {}
