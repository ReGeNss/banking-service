import { Controller, Body, Get, Post } from '@nestjs/common';
import { DepositService } from "./deposit.service";
import { OpenDto } from "./dtos/open.dto";
import { CalculateProfitDto } from "./dtos/calculate-profit.dto";

@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService ) {}

  @Get('calculate')
  calculateProfit(@Body() body: CalculateProfitDto) {
    return this.depositService.calculateProfit(body.percent,body.amount, body.term);
  }

  @Post('open')
  openDeposit(@Body() body: OpenDto) {
    return this.depositService.createDeposit(body.accountId, body.amount, body.term, body.percent);
  }

}
