import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
