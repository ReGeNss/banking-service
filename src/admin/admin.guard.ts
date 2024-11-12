import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "../metadata.constants";
import { Request } from 'express';
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.servise";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(isPublic){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET});
      const login = payload.login;
      const id = payload.sub;
      if(!login || !id) {
        throw new UnauthorizedException;
      }
      const admin = await this.prisma.admin.findFirst({
        where: {
          login,
          id
        }
      });
      if(!admin) {
        throw new UnauthorizedException;
      }
      request.admin = payload;
    }
    catch (e) {
      throw new UnauthorizedException;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
