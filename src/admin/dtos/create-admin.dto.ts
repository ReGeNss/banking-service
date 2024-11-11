import { IsString } from "class-validator";

export class CreateAdminDto{
    @IsString()
    login: string;
    @IsString()
    password: string;
    @IsString()
    name: string;
    @IsString()
    surname: string;
}