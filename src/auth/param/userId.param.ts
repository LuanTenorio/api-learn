import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwtPayload.dto';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request & { user: JwtPayloadDto };
    const user = request.user;

    if (!user || !user.sub) 
      throw new UnauthorizedException('User not authenticated or invalid token payload');

    return user.sub;
  },
);