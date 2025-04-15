import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(body: SignUpDto) {
    const { username, email, password } = body;
    const user = await this.userService.findUser({ email });
    if (user) throw new BadRequestException('Account already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      username,
      email,
      password: hashedPassword,
    };

    await this.userService.createUser(userData);
  }

  async login(body: LoginDto) {

  }
}
