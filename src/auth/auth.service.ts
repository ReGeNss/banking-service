import { Injectable,UnauthorizedException, BadRequestException} from '@nestjs/common';
import { PrismaService } from "../prisma.servise";
import { JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      }
    });
    if(!user) {
      throw new BadRequestException('User not found');
    }
    if(user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string, name: string, surname: string) {
    const user = await this.prisma.user.create({
      data: {
        isActive: true,
        email,
        password,
        name,
        surname
      }
    });
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
