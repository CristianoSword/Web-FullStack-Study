import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AccountEntity } from "./entities/account.entity";

@Injectable()
export class AccountsService {
  private readonly accounts = [
    new AccountEntity(1, "Maria", "maria@company.dev", "platform", true),
    new AccountEntity(2, "Joao", "joao@company.dev", "sales", true),
  ];

  findAll() {
    return this.accounts;
  }

  create(payload: CreateAccountDto) {
    const nextId = this.accounts.at(-1)?.id ? this.accounts.at(-1)!.id + 1 : 1;
    const account = new AccountEntity(nextId, payload.name, payload.email, payload.team, true);
    this.accounts.push(account);
    return account;
  }
}
