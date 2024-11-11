import { Controller, Get, Post, Body, Delete, Patch, UseGuards } from "@nestjs/common";
import { AccountService } from "./account.service";
import { OpenAccountDto } from "./dtos/open-account.dto";
import { CloseAccountDto } from "./dtos/close-account.dto";
import { TransferDto } from "./dtos/transfer.dto";
import { WithdrawDto } from "./dtos/withdraw.dto";
import { BalanceDto } from "./dtos/balance.dto";
import { DepositHistoryDto } from "./dtos/deposit-history.dto";
import {CurrentUserId } from "../decorators/current-user.decorator";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('balance')
  async balance(@CurrentUserId() userId: number,@Body() body:  BalanceDto) {
    await this.isAccountOwnerCheck(userId, body.accountId);
    return this.accountService.getBalance(body.accountId, body.currency);
  }

  @Get('depositHistory')
  async getDepositHistory(@CurrentUserId() userId:number,@Body() body: DepositHistoryDto ) {
    await this.isAccountOwnerCheck(userId, body.accountId);
    return this.accountService.getDepositHistory(body.accountId);
  }

  @Post('open')
  openAccount(@CurrentUserId() userId:number ,@Body() body: OpenAccountDto) {
    if(body.userId !== userId){
      throw new Error('You can only open an account for yourself');
    }
    return this.accountService.openAccount(body.userId, body.currency);
  }

  @Delete('close')
  async closeAccount(@CurrentUserId() userId: number,@Body() body: CloseAccountDto) {
    await this.isAccountOwnerCheck(userId, body.accountId);
    return this.accountService.closeAccount(body.accountId);
  }

  @Patch('transfer')
  async transfer(@CurrentUserId() userId: number,@Body() body: TransferDto) {
    await this.isAccountOwnerCheck(userId, body.fromAccountId);
    return this.accountService.transfer(body.fromAccountId, body.toAccountId, body.amount);
  }

  @Patch('withdraw')
  async withdraw(@CurrentUserId() userId:number, @Body() body: WithdrawDto) {
    await this.isAccountOwnerCheck(userId, body.accountId);
    return this.accountService.withdraw(body.accountId, body.amount);
  }

  async isAccountOwnerCheck(userId: number, accountId: number) {
    const isOwner = await this.accountService.isAccountOwner(userId, accountId);
    if (!isOwner) {
      throw new Error('You are not the owner of this account');
    }
  }

}
