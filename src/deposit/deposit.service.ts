import {BadRequestException, Injectable} from '@nestjs/common';
import { PrismaService } from "../prisma.servise";

@Injectable()
export class DepositService {
  constructor(private prisma: PrismaService) {}

  calculateProfit(percent: number, amount: number, term:number) {
    const profit = amount * (1 + percent / (12 * 100)) ^ term;
    let newAmount = amount+profit;
    return newAmount;
  }

  async isAccountActiveCheck(accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId
      }
    });
    let userId = account.userId;
    let user = await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    if(!user.isActive) {
      throw new BadRequestException('Account is blocked');
    }
  }

  async createDeposit(accountId: number, amount: number, term: number, percent:number) {
    await this.isAccountActiveCheck(accountId);
    const account = await this.prisma.account.findFirst({ where: { id: accountId } });
    if(account.balance < amount) throw new BadRequestException('Insufficient funds');
    let data = new Date();
    await this.prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        transactionsHistory: {
          push: [`${data} Opened deposit with amount: ${amount}. Term: ${term} months. Percent: ${percent}%`]
        },
        balance: {
          decrement: amount
        }
    }});

    return this.prisma.deposit.create({
      data:{
        amount,
        startDate: new Date(),
        term,
        percent,
        account: {
          connect: {
            id: accountId
          }
        }
      }
    });
  }

  async isAccountOwner(userId: number, accountId: number) {
    const account = await this.prisma.account.findFirst({
      where:{
        id: accountId
      }
    })
    return account.userId === userId;
  }
}
