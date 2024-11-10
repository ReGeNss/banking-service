import { Controller,Body ,Post,Get } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService ) {}


}
