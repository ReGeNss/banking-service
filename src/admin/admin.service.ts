import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.servise";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

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
