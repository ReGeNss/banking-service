import { Controller, Delete} from '@nestjs/common';
import { UserService } from "./user.service";
import { CurrentUserId } from "../decorators/current-user.decorator";

@Controller('user')
export class UserController {
  constructor(private userService: UserService ) {}

  @Delete('delete')
  deleteUser(@CurrentUserId() userId: number) {
    return this.userService.deleteUser(userId);
  }

}
