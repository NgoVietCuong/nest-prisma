import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_ROLES_KEY, IS_PUBLIC_KEY } from 'src/common/decorators';
import { ServerException } from 'src/common/exceptions';
import { Role } from 'src/generated/prisma/client';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { UserRequestPayload } from 'src/shared/interfaces';

@Injectable()
export class RoleBasedAccessControlGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ACCESS_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles?.length) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserRequestPayload;

    if (!user?.role || !requiredRoles.includes(user.role)) {
      throw new ServerException(ERROR_RESPONSE.RESOURCE_FORBIDDEN);
    }

    return true;
  }
}
