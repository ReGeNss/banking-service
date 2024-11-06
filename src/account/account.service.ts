import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.servise";

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async openAccount(userId: number, currency: string) {
    return this.prisma.account.create({
      data: {
        balance: 0,
        user: {
          connect: {
            id: userId
          }
        },
        currency }
    });
  }

  async closeAccount(accountId: number) {
    return this.prisma.account.delete({
      where: {
        id: accountId
      }
    });
  }

  async transfer(fromAccountId: number, toAccountId: number, amount: number) {
    let transferSum = amount;

    const fromAccount = await this.prisma.account.findFirst({
      where: {
        id: fromAccountId
      }
    });
    let userBalance = fromAccount.balance;

    const toAccount = await this.prisma.account.findFirst({
      where: {
        id: toAccountId
      }
    });
    if(!fromAccount || !toAccount) {
      throw new Error('Account not found');
    }
    if(fromAccount.currency !== toAccount.currency) {
      const toAccountCurrency = toAccount.currency.toLowerCase();
      const fromAccountCurrency = fromAccount.currency.toLowerCase();
      let response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromAccountCurrency}.json`);
      if(!response.ok) throw new Error('Sorry, there was an error in currency conversion, please try again later.');

      let json = await response.json();
      let currencyExchangesRate = JSON.parse(JSON.stringify(json));
      let exchangeRate = currencyExchangesRate[fromAccountCurrency][toAccountCurrency];
      transferSum*= exchangeRate;
      userBalance*= exchangeRate;
    }

    if (userBalance < transferSum) {
      throw new Error('Insufficient funds');
    }
    return this.prisma.$transaction([
      this.prisma.account.update({
        where: {
          id: fromAccountId
        },
        data: {
          balance: {
            decrement: amount
          }
        }
      }),
      this.prisma.account.update({
        where: {
          id: toAccountId
        },
        data: {
          balance: {
            increment: transferSum
          }
        }
      })
    ]);
  }
}
