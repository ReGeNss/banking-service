import { IsInt } from "class-validator";

export class ChangeDepositPercentsDto {
  @IsInt()
  percents: number;

  @IsInt()
  depositId: number;
}