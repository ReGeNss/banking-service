import { IsInt, IsNumber, IsNumberString } from "class-validator";

export class CalculateProfitDto {
  @IsNumberString()
  percent: number;
  @IsNumberString()
  amount: number;
  @IsNumberString()
  term: number;
}