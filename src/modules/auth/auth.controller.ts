import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginBodyDto, SignUpBodyDto } from 'src/modules/auth/dto';
import { ResponseMessage } from 'src/common/decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'sign up' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account created successfully'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Account already exists'
  })
  @ResponseMessage('Account created successfully')
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() body: SignUpBodyDto) {
    return this.authService.signUp(body);
  }

  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: HttpStatus.OK })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginBodyDto) {
    return this.authService.login(body);
  }
}
