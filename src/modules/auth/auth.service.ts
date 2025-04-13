import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Injectable()
export class AuthService {
  async login(body: LoginDto) {

  }
}
