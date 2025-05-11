import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ACCESS_ROLES_KEY = 'roles';
export const RoleBaseAccessControl = (...roles: Role[]) => SetMetadata(ACCESS_ROLES_KEY, roles);
