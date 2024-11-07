import { IsNumber } from 'class-validator'

export class WithdrawDto {
  @IsNumber()
  accountId: number
  @IsNumber()
  amount: number
}
