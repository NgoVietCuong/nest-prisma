import type { Role } from '@prisma/client';
import type { JwtTokenType } from 'src/shared/enums';

export interface JwtPayload {
  id: number;
  email: string;
  role?: Role;
  type: JwtTokenType;
}

export interface RequestUserPayload {
  id: number;
  email: string;
  role?: Role;
}
