import { IsNumber } from 'class-validator';

export class TransferDto{
  @IsNumber()
  fromAccountId: number
  @IsNumber()
  toAccountId: number
  @IsNumber()
  amount: number
}