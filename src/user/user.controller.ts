import { Controller,Body ,Post,Get } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserRegistrationDto } from "./dtos/user-registration.dto";
import { UserAuthDto } from "./dtos/user-auth.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService ) {}

  @Post('register')
  registerUser(@Body() body: UserRegistrationDto) {
    return this.userService.registerUser(body.name, body.surname, body.email, body.password);
  }

  @Get('auth')
  authUser(@Body() body: UserAuthDto): Promise<number> {
    return this.userService.userAuth(body.email, body.password);
  }

}
