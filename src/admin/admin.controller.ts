import { Controller, Get, Post, Patch, Body, UseGuards, ParseIntPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminGuard } from "./admin.guard";
import { ChangeDepositPercentsDto } from "./dtos/change-deposit-percents.dto";
import { AdminAuthDto } from './dtos/admin-auth.dto';
import { Public } from 'src/metadata.constants';
import { CreateAdminDto } from "./dtos/create-admin.dto";

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Public()
  @Post('auth')
  login(@Body() body: AdminAuthDto) {
    return this.adminService.signIn(body.login, body.password);

  }

  @Post('create')
  createAdmin(@Body() body: CreateAdminDto) {
    return this.adminService.createAdmin(body.login, body.password, body.name, body.surname);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('deposit-history')
  getDepositHistory(@Body('accountId', ParseIntPipe) accountId: number) {
    return this.adminService.getDepositHistory(accountId);
  }

  @Patch('block')
  blockUser(@Body('userId',ParseIntPipe) userId: number) {
    return this.adminService.blockUser(userId);
  }

  @Patch('unblock')
  unblockUser(@Body('userId',ParseIntPipe) userId: number) {
    return this.adminService.unblockUser(userId);
  }

  @Patch('change-deposit-percents')
  changeDepositPercents(@Body() body: ChangeDepositPercentsDto) {
    return this.adminService.changeDepositPercents(body.depositId, body.percents);
  }

}
