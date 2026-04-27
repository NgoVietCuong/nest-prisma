import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ServerException } from 'src/common/exceptions';
import { jwtConfiguration } from 'src/config';
import { Role, User, UserStatus } from 'src/generated/prisma/client';
import { RedisService } from 'src/infrastructure/redis';
import { UserService } from 'src/modules/user';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { JwtTokenType } from 'src/shared/enums';
import { TokenPayload, UserSessionData } from 'src/shared/interfaces';
import { getTtlValue } from 'src/shared/utilities';
import { v4 as uuidv4 } from 'uuid';
import {
  LoginBodyDto,
  LoginResponseDto,
  LogoutResponseDto,
  RefreshTokenBodyDto,
  RefreshTokenResponseDto,
  SignUpBodyDto,
  SignUpResponseDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    @Inject(jwtConfiguration.KEY) private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {}

  async signUp(body: SignUpBodyDto): Promise<SignUpResponseDto> {
    const { username, email, password } = body;
    const user = await this.userService.findUser({ email });

    if (user) throw new ServerException(ERROR_RESPONSE.USER_ALREADY_EXISTS);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      username,
      email,
      password: hashedPassword,
      role: Role.User,
    };

    const newUser = await this.userService.createUser(userData);
    return this.manageUserToken(newUser);
  }

  async login(body: LoginBodyDto): Promise<LoginResponseDto> {
    const { email, password } = body;
    const user = await this.userService.findUser({ email });

    if (!user) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);
    if (!user.password) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);
    if (!user.emailVerified) throw new ServerException(ERROR_RESPONSE.EMAIL_NOT_VERIFIED);
    if (user.status !== UserStatus.Active)
      throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);

    return this.manageUserToken(user);
  }

  async logout(userId: number): Promise<LogoutResponseDto> {
    await this.redisService.deleteKey(`${JwtTokenType.RefreshToken}_${userId}`);
    return { success: true };
  }

  async refreshToken(body: RefreshTokenBodyDto): Promise<RefreshTokenResponseDto> {
    const { refreshToken } = body;

    let payload: TokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<TokenPayload>(refreshToken, {
        secret: this.jwtConfig.secret,
      });
    } catch {
      throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    }

    const { id, jti } = payload;
    const userTokenKey = this.redisService.getUserTokenKey(id, jti);
    const isTokenValid = await this.redisService.getValue<string>(userTokenKey);
    if (!isTokenValid) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);

    const user = await this.userService.findUser({ id });
    if (!user) throw new ServerException(ERROR_RESPONSE.INVALID_CREDENTIALS);

    const accessToken = await this.generateToken(
      { ...payload, role: user.role },
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
        status: user.status,
        emailVerified: user.emailVerified,
      },
      getTtlValue(this.jwtConfig.refreshTokenExpiresIn),
    );

    return { accessToken, refreshToken };
  }

  private generateToken(
    payload: Partial<TokenPayload>,
    type: JwtTokenType,
    expiresIn: number | string,
  ): Promise<string> {
    const tokenPayload: TokenPayload = {
      id: payload.id!,
      email: payload.email!,
      jti: payload.jti!,
      type,
      ...(type === JwtTokenType.AccessToken && { role: payload.role }),
    };

    const options: Partial<JwtSignOptions> = {
      expiresIn: expiresIn,
    } as unknown as JwtSignOptions;

    return this.jwtService.signAsync(tokenPayload, options);
  }
}
