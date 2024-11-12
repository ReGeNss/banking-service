import { IsISO4217CurrencyCode, IsNumberString } from "class-validator";

export class BalanceDto{
  @IsNumberString()
  accountId: string

  @IsISO4217CurrencyCode()
  currency: string
}