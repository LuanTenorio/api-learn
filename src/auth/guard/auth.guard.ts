
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../metadata/public.metadata';
import { JwtPayloadDto } from '../dto/jwtPayload.dto';

@Injectable()
export class AuthGuard implements CanActivate {

    @Inject()
    private readonly jwtService: JwtService

    @Inject()
    private readonly reflector: Reflector

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.checkIfIsPublicRoute(context)

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("Unauthorized")
        }

        const payload = await this.verifyPayload(token)
        this.setPayloadInRequest(request, payload)

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

    private checkIfIsPublicRoute(context: ExecutionContext) {
        return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
    }

    private setPayloadInRequest(request: any, payload: JwtPayloadDto) {
        const { iat, exp, ...user } = payload
        request["user"] = user
    }

    private async verifyPayload(token: string) {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayloadDto>(token,
                { secret: jwtConstants.secret }
            )

            return payload
        } catch {
            throw new UnauthorizedException("Unauthorized")
        }
    }
}
