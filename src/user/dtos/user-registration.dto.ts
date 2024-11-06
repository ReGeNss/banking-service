import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegistrationDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
}