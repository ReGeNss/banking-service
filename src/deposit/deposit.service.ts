import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.servise";

@Injectable()
export class DepositService {
  constructor(private prisma: PrismaService) {}

  calculateProfit(percent: number, amount: number, term:number) {
    const profit = amount * term * 30 *percent / 36500;
    let newAmount = amount+profit;
    return newAmount;
  }

  async createDeposit(accountId: number, amount: number, term: number, percent:number) {
    const account = await this.prisma.account.findFirst({ where: { id: accountId } });
    if(account.balance < amount) throw new Error('Insufficient funds');
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
