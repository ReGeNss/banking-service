import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from "./constants";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../prisma.servise";

@Module({
  providers: [AuthService,PrismaService],
  controllers: [AuthController],
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
})
export class AuthModule {}
