import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { ServerException } from 'src/common/exceptions';
import { jwtConfiguration } from 'src/config';
import { RedisService } from 'src/infrastructure/redis';
import { LoginBodyDto, SignUpBodyDto } from 'src/modules/auth/dto';
import { UserService } from 'src/modules/user';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';
import { UserSessionData } from 'src/shared/interfaces';
import { getTtlValue } from 'src/shared/utilities';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, RequestUserPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
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

    return this.manageUserToken(user);
  }

  async logout(userId: number) {
    await this.redisService.deleteKey(`${JwtTokenType.RefreshToken}_${userId}`);
    return {};
  }

  async refreshToken(userPayload: RequestUserPayload) {
    const accessToken = await this.generateToken(
      userPayload,
      JwtTokenType.AccessToken,

      this.jwtConfig.accessTokenExpiresIn,
    );

    return { accessToken };
  }

  private async manageUserToken(user: User) {
    const jti = uuidv4();
    const tokenPayload = {
      id: user.id,
      jti,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        tokenPayload,
        JwtTokenType.AccessToken,
        this.jwtConfig.accessTokenExpiresIn,
      ),
      this.generateToken(
        tokenPayload,
        JwtTokenType.RefreshToken,
        this.jwtConfig.refreshTokenExpiresIn,
      ),
    ]);

    await this.redisService.setValue<UserSessionData>(
      this.redisService.getUserTokenKey(user.id, jti),
      {
        role: user.role,
        emailVerified: user.emailVerified,
      },
      getTtlValue(this.jwtConfig.refreshTokenExpiresIn),
    );

    return { accessToken, refreshToken };
  }

  private generateToken(
    payload: Partial<JwtPayload>,
    type: JwtTokenType,
    expiresIn: number | string,
  ): Promise<string> {
    const tokenPayload: JwtPayload = {
      id: payload.id!,
      email: payload.email!,
      type,
      ...(type === JwtTokenType.AccessToken && { role: payload.role }),
    };

    return this.jwtService.signAsync(tokenPayload, { expiresIn });
  }
}
