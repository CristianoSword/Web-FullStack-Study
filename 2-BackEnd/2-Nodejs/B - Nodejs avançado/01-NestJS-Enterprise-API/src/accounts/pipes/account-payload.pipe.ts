import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateAccountDto } from "../dto/create-account.dto";

@Injectable()
export class AccountPayloadPipe implements PipeTransform {
  transform(value: CreateAccountDto) {
    if (!value?.name?.trim()) {
      throw new BadRequestException("Name is required.");
    }

    if (!value?.email?.includes("@")) {
      throw new BadRequestException("Valid email is required.");
    }

    if (!value?.team?.trim()) {
      throw new BadRequestException("Team is required.");
    }

    return {
      ...value,
      name: value.name.trim(),
      email: value.email.trim().toLowerCase(),
      team: value.team.trim().toLowerCase(),
    };
  }
}
