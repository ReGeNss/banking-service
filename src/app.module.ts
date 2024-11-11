import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { DepositModule } from './deposit/deposit.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UserModule, AccountModule, DepositModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
