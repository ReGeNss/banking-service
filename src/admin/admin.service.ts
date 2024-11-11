import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma.servise";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService,private jwtService: JwtService) {}

  async signIn(login: string, password: string) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        login,
      }
    });
    if(!admin) {
      throw new Error('Administrator not found');
    }
    if(admin.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { login: admin.login, sub: admin.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAdmin(login: string, password: string, name: string, surname: string) {
    const admin = await this.prisma.admin.create({
      data: {
        login,
        password,
        name,
        surname
      }
    });
    const payload = { login: admin.login, sub: admin.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async blockUser(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isActive: false
      }
    });
  }

  async unblockUser(userId: number) {
    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isActive: true
      }
    });
  }

  async getDepositHistory(accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId
      }
    });
    return account.transactionsHistory;
  }

  async changeDepositPercents(depositId: number, percent: number) {
    return this.prisma.deposit.update({
      where: {
        id: depositId
      },
      data: {
        percent
      }
    });
  }
}
