import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { PrismaService } from "../prisma.servise";

@Module({
  controllers: [DepositController],
  providers: [DepositService,PrismaService]
})
export class DepositModule {}
