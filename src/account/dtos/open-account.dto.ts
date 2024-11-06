import {IsNumber, IsISO4217CurrencyCode} from 'class-validator';

export class OpenAccountDto {
  @IsNumber()
  userId: number
  @IsISO4217CurrencyCode()
  currency: string
}