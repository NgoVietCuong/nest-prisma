import { JwtTokenType } from 'src/shared/enums';
import { Role } from '@prisma/client';

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
