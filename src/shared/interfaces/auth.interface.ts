import { Role } from '@prisma/client';
import { JwtTokenType } from '../enums';

export interface TokenPayload {
  id: string;
  email: string;
  jti: string;
  role: Role;
  type: JwtTokenType;
  iss: string;
  key: string;
}

export interface UserRequestPayload {
  id: string;
  jti: string;
  email: string;
  role: Role;
  emailVerified?: boolean;
  organizationId?: string;
}

export interface UserSessionData {
  role: Role;
  emailVerified?: boolean;
}
