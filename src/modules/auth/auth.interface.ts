import { JwtTokenType } from './auth.enum';
import { Role } from '@prisma/client';

export interface JwtPayload {
  id: number,
  email: string,
  role?: Role,
  type: JwtTokenType
}
