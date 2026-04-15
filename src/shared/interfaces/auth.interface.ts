import { Role, UserStatus } from 'src/generated/prisma/client';
import { JwtTokenType } from '../enums';

export interface TokenPayload {
  id: number;
  email: string;
  jti: string;
  role: Role;
  type: JwtTokenType;
}

export interface UserRequestPayload {
  id: number;
  jti: string;
  email: string;
  role: Role;
  emailVerified?: boolean;
}

export interface UserSessionData {
  role: Role;
  status: UserStatus;
  emailVerified?: boolean;
}
