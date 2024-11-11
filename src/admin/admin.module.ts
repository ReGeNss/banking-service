import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from "../prisma.servise";
import { AdminGuard } from "./admin.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    PrismaService,
  ]
})
export class AdminModule {}
