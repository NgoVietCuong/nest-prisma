import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, SwaggerApiDocument, User } from 'src/common/decorators';
import { AuthService } from './auth.service';
import {
  LoginBodyDto,
  LoginResponseDto,
  LogoutResponseDto,
  RefreshTokenBodyDto,
  RefreshTokenResponseDto,
  SignUpBodyDto,
  SignUpResponseDto,
} from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @Public()
  @SwaggerApiDocument({
    response: { status: HttpStatus.OK, type: SignUpResponseDto },
    body: { type: SignUpBodyDto, required: true },
    operation: {
      operationId: `signUp`,
      summary: `Api signUp`,
      description: `User sign up`,
    },
    extra: { isPublic: true },
  })
  async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }

  @Post('login')
  @Public()
  @SwaggerApiDocument({
    response: { status: HttpStatus.OK, type: LoginResponseDto },
    body: { type: LoginBodyDto, required: true },
    operation: {
      operationId: `login`,
      summary: `Api internalLogin`,
      description: `Internal login with email and password`,
    },
    extra: { isPublic: true },
  })
  async login(@Body() body: LoginBodyDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  @Public()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: RefreshTokenResponseDto,
    },
    operation: {
      operationId: `refreshToken`,
      summary: `Api refreshToken`,
      description: `Refresh token when access token expired`,
    },
    extra: { isPublic: true },
  })
  async refreshToken(@Body() body: RefreshTokenBodyDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(body);
  }

  @Post('logout')
  @ApiBearerAuth()
  @SwaggerApiDocument({
    response: {
      status: HttpStatus.OK,
      type: LogoutResponseDto,
    },
    operation: {
      operationId: `logout`,
      summary: `Api logout`,
      description: `User logout`,
    },
  })
  async logout(@User('id') id: number): Promise<LogoutResponseDto> {
    return this.authService.logout(id);
  }
}
