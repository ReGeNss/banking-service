import { IsEmail, IsString } from 'class-validator';

export class UserAuthDto{
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}