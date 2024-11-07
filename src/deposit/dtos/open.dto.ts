import {IsNumber,IsInt } from 'class-validator'

export class OpenDto{
  @IsInt()
  accountId: number
  @IsNumber()
  amount: number
  @IsInt()
  term: number
  @IsNumber()
  percent: number
}