import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, User } from 'src/common/decorators';
import { AuthService } from 'src/modules/auth/auth.service';
import {
  LoginBodyDto,
  LoginResponseDto,
  RefreshTokenBodyDto,
  RefreshTokenResponseDto,
  SignUpBodyDto,
  SignUpResponseDto,
} from 'src/modules/auth/dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @Public()
  async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }

  @Post('login')
  @Public()
  async login(@Body() body: LoginBodyDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  @Public()
  async refreshToken(@Body() body: RefreshTokenBodyDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(body);
  }

  @Post('logout')
  @ApiBearerAuth()
  async logout(@User('id') id: number) {
    return this.authService.logout(id);
  }
}
