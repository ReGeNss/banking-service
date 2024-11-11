import { Controller, Body, Get, Post, UseGuards } from "@nestjs/common";
import { DepositService } from "./deposit.service";
import { OpenDto } from "./dtos/open.dto";
import { CalculateProfitDto } from './dtos/calculate-profit.dto';
import { Public } from 'src/metadata.constants';
import { CurrentUserId } from "../decorators/current-user.decorator";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService ) {}

  @Public()
  @Get('calculate')
  calculateProfit(@Body() body: CalculateProfitDto) {
    return this.depositService.calculateProfit(body.percent,body.amount, body.term);
  }

  @Post('open')
  openDeposit(@CurrentUserId() userId: number,@Body() body: OpenDto) {
    const isOwner = this.depositService.isAccountOwner(userId, body.accountId);
    if(!isOwner) throw new Error('You are not the owner of this account');
    return this.depositService.createDeposit(body.accountId, body.amount, body.term, body.percent);
  }


}
