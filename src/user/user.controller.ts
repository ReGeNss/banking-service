import { Controller, Delete, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUserId } from "../decorators/current-user.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService ) {}

  @Delete('delete')
  deleteUser(@CurrentUserId() userId: number) {
    return this.userService.deleteUser(userId);
  }

}
