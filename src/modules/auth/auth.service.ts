import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginBodyDto, SignUpBodyDto } from 'src/modules/auth/dto';
import { UserService } from '../user/user.service';
import { ServerException } from 'src/common/exceptions';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { Role } from '@prisma/client';
import { error } from 'winston';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(body: SignUpBodyDto) {
    const { username, email, password } = body;
    const user = await this.userService.findUser({ email });

    if (user) throw new ServerException(ERROR_RESPONSE.USER_ALREADY_EXISTS);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      username,
      email,
      password: hashedPassword,
      role: Role.USER,
    };

    await this.userService.createUser(userData);
    return {};
  }

  async login(body: LoginBodyDto) {
    const { email, password } = body;
    const user = await this.userService.findUser({ email });

    if (!user) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);
    if (!user.password) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);
    if (!user.emailVerified)
      throw new ServerException({
        ...ERROR_RESPONSE.UNAUTHORIZED,
        message: 'Email not verified',
      });
    if (!user.isActive)
      throw new ForbiddenException('Account is inactive, please contact admin', 'ACCOUNT_DEACTIVATED');
  }
}
