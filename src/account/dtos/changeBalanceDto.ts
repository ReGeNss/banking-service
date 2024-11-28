import { IsNumber } from 'class-validator'

export class changeBalanceDto {
  @IsNumber()
  accountId: number
  @IsNumber()
  amount: number
}
