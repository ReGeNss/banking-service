import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException
} from '@nestjs/common';
import { PrismaService } from "../prisma.servise";

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async isAccountOwnerCheck(userId: number, accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId
      }
    });
    if (account.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this account');
    }
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

  async getDepositHistory(accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId
      }
    });
    return account.transactionsHistory;
  }

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
    await this.isAccountActiveCheck(accountId);
    return this.prisma.account.delete({
      where: {
        id: accountId
      }
    });
  }

  async charge(accountId: number, amount: number) {
    await this.isAccountActiveCheck(accountId);
    return this.prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: {
          increment: amount
        }
      }
    });
  }

  async transfer(fromAccountId: number, toAccountId: number, amount: number) {
    await this.isAccountActiveCheck(fromAccountId);
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
      throw new NotFoundException('Account not found');
    }
    if(fromAccount.currency !== toAccount.currency) {
      let exchangeRate = await this.getExchangeRate(fromAccount.currency, toAccount.currency);
      transferSum*= exchangeRate;
      userBalance*= exchangeRate;
    }

    if (userBalance < transferSum) {
      throw new BadRequestException('Insufficient funds');
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

  async withdraw(accountId: number, amount: number) {
    await this.isAccountActiveCheck(accountId);
    const account = await this.prisma.account.findFirst(
      {
        where: {
          id: accountId
        }
      }
    )
    const balance = account.balance;
    if(balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }
    return this.prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    });
  }

  async getBalance(accountId: number, toCurrency: string) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId
      }
    });
    let balance = account.balance;
    if (account.currency !== toCurrency) {
      let exchangeRate =await this.getExchangeRate(account.currency, toCurrency);
      balance*= exchangeRate;
    }

    return balance;
  }

  async getExchangeRate(fromCurrency: string, toCurrency:string): Promise<number> {
    let fromCurrencyFormated = fromCurrency.toLowerCase();
    let toCurrencyFormated = toCurrency.toLowerCase();
    let response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyFormated}.json`);
    if(!response.ok) throw new InternalServerErrorException('Sorry, there was an error in currency conversion, please try again later.');

    let json = await response.json();
    let currencyExchangesRate = JSON.parse(JSON.stringify(json));
    let exchangeRate = currencyExchangesRate[fromCurrencyFormated][toCurrencyFormated];
    return exchangeRate;
  }
}
