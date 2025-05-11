import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ACCESS_ROLES_KEY, IS_PUBLIC_KEY } from 'src/common/decorators';
import { ServerException } from 'src/common/exceptions';
import { ERROR_RESPONSE } from 'src/shared/constants';
import { Role } from '@prisma/client';
import { RequestUserPayload } from 'src/modules/auth/auth.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Allow public routes
    if (isPublic) {
      return true;
    }

    // Validate token
    await super.canActivate(context);

    // Check access roles
    const allowAccessRoles = this.reflector.getAllAndOverride<Role[]>(ACCESS_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user: RequestUserPayload = request.user;
    const userRole = user.role!;
    if (!allowAccessRoles?.length || allowAccessRoles.includes(userRole)) {
      return true;
    }

    throw new ServerException(ERROR_RESPONSE.RESOURCE_FORBIDDEN);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    }

    return user;
  }
}
