import { IsNumber } from 'class-validator'

export class CloseAccountDto {
  @IsNumber()
  accountId: number
}