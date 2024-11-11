import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.servise";


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: {
        id: userId
      }
    });
  }

}
