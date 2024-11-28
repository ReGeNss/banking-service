import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  ForbiddenException,
  Query,
  ParseIntPipe
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { OpenAccountDto } from "./dtos/open-account.dto";
import { CloseAccountDto } from "./dtos/close-account.dto";
import { TransferDto } from "./dtos/transfer.dto";
import { changeBalanceDto } from "./dtos/changeBalanceDto";
import { BalanceDto } from "./dtos/balance.dto";
import {CurrentUserId } from "../decorators/current-user.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('balance')
  async balance(@CurrentUserId() userId: number, @Query() query: BalanceDto) {
    await this.accountService.isAccountOwnerCheck(userId, parseInt(query.accountId));
    return this.accountService.getBalance(parseInt(query.accountId), query.currency);
  }

  @Get('depositHistory')
  async getDepositHistory(@CurrentUserId() userId:number,@Query('accountId',ParseIntPipe) accountId: number) {
    await this.accountService.isAccountOwnerCheck(userId, accountId);
    return this.accountService.getDepositHistory(accountId);
  }

  @Post('open')
  openAccount(@CurrentUserId() userId:number ,@Body() body: OpenAccountDto) {
    return this.accountService.openAccount(userId, body.currency);
  }

  @Delete('close')
  async closeAccount(@CurrentUserId() userId: number,@Body() body: CloseAccountDto) {
    await this.accountService.isAccountOwnerCheck(userId, body.accountId);
    return this.accountService.closeAccount(body.accountId);
  }

  @Patch('transfer')
  async transfer(@CurrentUserId() userId: number,@Body() body: TransferDto) {
    await this.accountService.isAccountOwnerCheck(userId, body.fromAccountId);
    return this.accountService.transfer(body.fromAccountId, body.toAccountId, body.amount);
  }

  @Patch('charge')
  async charge(@Body() body: changeBalanceDto) {
    return this.accountService.charge(body.accountId, body.amount);
  }

  @Patch('withdraw')
  async withdraw(@CurrentUserId() userId:number, @Body() body: changeBalanceDto) {
    await this.accountService.isAccountOwnerCheck(userId, body.accountId);
    return this.accountService.withdraw(body.accountId, body.amount);
  }



}
