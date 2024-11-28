import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { DepositModule } from './deposit/deposit.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    UserModule,
    AccountModule,
    DepositModule,
    AuthModule,
    AdminModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    })
  ],
})
export class AppModule {}
