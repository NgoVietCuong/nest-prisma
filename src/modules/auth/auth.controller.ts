import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public, RefreshToken, ResponseMessage, User } from 'src/common/decorators';
import { RequestUserPayload } from 'src/modules/auth/auth.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginBodyDto, SignUpBodyDto, SignUpResponseDto } from 'src/modules/auth/dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'sign up' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account created successfully',
    type: SignUpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Account already exists',
  })
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Account created successfully')
  @Public()
  @Post('sign-up')
  async signUp(@Body() body: SignUpBodyDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }

  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: HttpStatus.OK })
  @ResponseMessage('Login successfully')
  @Public()
  @Post('login')
  async login(@Body() body: LoginBodyDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: 'refresh-token' })
  @ApiResponse({ status: HttpStatus.OK })
  @RefreshToken()
  @ApiBearerAuth()
  @Post('refresh-token')
  async refreshToken(@User() userPayload: RequestUserPayload) {
    return this.authService.refreshToken(userPayload);
  }

  @ApiOperation({ summary: 'logout' })
  @ApiResponse({ status: HttpStatus.OK })
  @Post('logout')
  @ApiBearerAuth()
  async logout(@User('id') id: number) {
    return this.authService.logout(id);
  }
}
