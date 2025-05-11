import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { LoginBodyDto, SignUpBodyDto } from 'src/modules/auth/dto';
import { UserService } from 'src/modules/user';
import { CacheService } from 'src/shared/cache';
import { ServerException } from 'src/common/exceptions';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { jwtConfiguration } from 'config';
import { JwtTokenType } from 'src/shared/enums';
import { JwtPayload, RequestUserPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    @Inject(jwtConfiguration.KEY) private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {}

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
    if (!user.emailVerified) throw new ServerException(ERROR_RESPONSE.EMAIL_NOT_VERIFIED);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);

    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(tokenPayload, JwtTokenType.ACCESS_TOKEN, this.jwtConfig.accessTokenExpiresIn),
      this.generateToken(tokenPayload, JwtTokenType.REFRESH_TOKEN, this.jwtConfig.refreshTokenExpiresIn),
    ]);

    await this.cacheService.setCache<string>(
      `${JwtTokenType.REFRESH_TOKEN}_${user.id}`,
      refreshToken,
      this.jwtConfig.refreshTokenExpiresIn * 1000,
    );

    return { accessToken, refreshToken };
  }

  async logout(userId: number) {
    await this.cacheService.deleteCache(`${JwtTokenType.REFRESH_TOKEN}_${userId}`);
    return {};
  }

  async refreshToken(userPayload: RequestUserPayload) {
    const accessToken = await this.generateToken(
      userPayload,
      JwtTokenType.ACCESS_TOKEN,
      this.jwtConfig.accessTokenExpiresIn,
    );

    return { accessToken };
  }

  private async generateToken(payload: Partial<JwtPayload>, type: JwtTokenType, expiresIn: number) {
    const tokenPayload: JwtPayload = {
      id: payload.id!,
      email: payload.email!,
      type,
      ...(type === JwtTokenType.ACCESS_TOKEN && { role: payload.role }),
    };

    return this.jwtService.signAsync(tokenPayload, { expiresIn });
  }
}
