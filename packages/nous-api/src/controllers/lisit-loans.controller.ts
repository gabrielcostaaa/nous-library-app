import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/auth/admin.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/nous-loans-list")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class ListLoansController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle() {
    const loans = await this.prisma.loan.findMany({
      orderBy: { createdAt: "desc" },
    });
    return loans;
  }
}
