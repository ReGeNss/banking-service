import {IsISO4217CurrencyCode} from 'class-validator';

export class OpenAccountDto {
  @IsISO4217CurrencyCode()
  currency: string
}