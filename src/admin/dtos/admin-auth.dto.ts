import { IsString } from "class-validator";

export class AdminAuthDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}