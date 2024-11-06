import { Module } from '@nestjs/common';
import { UserrController } from './userr.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserrController, UserController],
  providers: [UserService]
})
export class UserModule {}
