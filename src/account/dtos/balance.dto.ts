import {IsNumber, IsISO4217CurrencyCode} from "class-validator";

export class BalanceDto{
  @IsNumber()
  accountId: number

  @IsISO4217CurrencyCode()
  currency: string
}