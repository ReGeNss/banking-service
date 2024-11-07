import { IsInt, IsNumber } from "class-validator";

export class CalculateProfitDto {
  @IsInt()
  percent: number;
  @IsNumber()
  amount: number;
  @IsInt()
  term: number;
}