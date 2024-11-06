import { Controller, Get,Post, Body, Delete, Patch} from '@nestjs/common';
import { AccountService } from "./account.service";
import { OpenAccountDto } from "./dtos/open-account.dto";
import { CloseAccountDto } from "./dtos/close-account.dto";
import { TransferDto } from "./dtos/transfer.dto";

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('open')
  openAccount(@Body() body: OpenAccountDto) {
    return this.accountService.openAccount(body.userId, body.currency);
  }

  @Delete('close')
  closeAccount(@Body() body: CloseAccountDto) {
    return this.accountService.closeAccount(body.accountId);
  }

  @Patch('transfer')
  transfer(@Body() body: TransferDto) {
    return this.accountService.transfer(body.fromAccountId, body.toAccountId, body.amount);
  }
  

}
