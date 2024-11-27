import { IsInt, IsNumber, IsNumberString } from "class-validator";

export class CalculateProfitDto {
  @IsNumberString()
  percent: string;
  @IsNumberString()
  amount: string;
  @IsNumberString()
  term: string;
}
