import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/nous-loans")
@UseGuards(AuthGuard("jwt"))
export class RegisterLoansController {
  constructor() { }

  @Post()
  async handle() {
    return "é os guri da praça"
  }
}