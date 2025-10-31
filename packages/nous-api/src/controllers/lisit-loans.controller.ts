import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/auth/admin.guard";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("Loans")
@ApiBearerAuth()
@Controller("/nous-loans-list")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class ListLoansController {
  constructor(private prisma: PrismaService) { }

  @Get()
  @ApiOperation({ summary: "Listar todos os empréstimos" })
  @ApiResponse({ status: 200, description: "Lista de empréstimos retornada com sucesso." })
  async handle() {
    return this.prisma.loan.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        userId: true,
        bookId: true,
        loanDate: true,
        dueDate: true,
        returnDate: true,
        status: true,
        fineDiscountApplied: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, name: true } },
        book: { select: { id: true, title: true } },
      },
    });
  }
}
