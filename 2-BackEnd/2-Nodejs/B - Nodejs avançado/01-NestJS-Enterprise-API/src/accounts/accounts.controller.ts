import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AccountPayloadPipe } from "./pipes/account-payload.pipe";

@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Post()
  @UsePipes(AccountPayloadPipe)
  create(@Body() payload: CreateAccountDto) {
    return this.accountsService.create(payload);
  }
}
