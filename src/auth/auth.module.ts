import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from "../prisma.servise";

@Module({
  providers: [AuthService,PrismaService],
  controllers: [AuthController],
  imports: [],
})
export class AuthModule {}
