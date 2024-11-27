import { Controller, Body, Get, Post, UseGuards, ForbiddenException, Query } from "@nestjs/common";
import { DepositService } from "./deposit.service";
import { OpenDto } from "./dtos/open.dto";
import { CalculateProfitDto } from './dtos/calculate-profit.dto';
import { Public } from 'src/metadata.constants';
import { CurrentUserId } from "../decorators/current-user.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@UseGuards(AuthGuard)
@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService ) {}

  @Public()
  @Get('calculate')
  calculateProfit(@Query() query: CalculateProfitDto) {
    return this.depositService.calculateProfit(parseInt(query.percent),parseInt(query.amount),parseInt(query.term));
  }

  @ApiBearerAuth('access-token')
  @Post('open')
  openDeposit(@CurrentUserId() userId: number,@Body() body: OpenDto) {
    const isOwner = this.depositService.isAccountOwner(userId, body.accountId);
    if(!isOwner) throw new ForbiddenException('You are not the owner of this account');
    return this.depositService.createDeposit(body.accountId, body.amount, body.term, body.percent);
  }


}
