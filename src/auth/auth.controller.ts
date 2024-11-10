import { Body, Controller,Post, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dtos/user-auth.dto";
import { UserRegistrationDto } from "./dtos/user-registration.dto";
import { Public } from "../metadata.constants";


@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: UserAuthDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Public()
  @Post('signup')
  register(@Body() body: UserRegistrationDto) {
    return this.authService.signUp(body.email, body.password,body.name,body.surname);
  }
}
