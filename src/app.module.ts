import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Prisma } from "@prisma/client";
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [UserModule, AccountModule, DepositModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
