import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthentificatedGuard
  extends AccessTokenGuard
  implements CanActivate
{
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated()) {
      return true;
    }
    return super.canActivate(context) as boolean;
  }
}
