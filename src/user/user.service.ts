import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.servise";


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async registerUser(name: string, surname: string, email: string, password: string) {
    return this.prisma.user.create({
      data: {
        name,
        surname,
        email,
        password,
        isActive: true,
      }
    });
  }

  async userAuth(email: string,password: string): Promise<number> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    });
    return  user.id;
  }
}
