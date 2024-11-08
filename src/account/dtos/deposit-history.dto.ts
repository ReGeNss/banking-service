import {IsInt} from "class-validator";

export class DepositHistoryDto{
  @IsInt()
  accountId: number
}