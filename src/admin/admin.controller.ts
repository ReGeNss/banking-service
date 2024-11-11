import { Controller, Get, Post, Patch, Body, UseGuards, ParseIntPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminGuard } from "./admin.guard";
import { ChangeDepositPercentsDto } from "./dtos/change-deposit-percents.dto";

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

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
