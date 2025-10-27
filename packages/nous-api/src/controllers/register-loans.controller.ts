import {
  Body,
  Controller,
  Post,
  UseGuards,
  BadRequestException,
  ConflictException,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/auth/admin.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const registerLoanBodySchema = z.object({
  userId: z.uuid("ID de usuário inválido"),
  bookId: z.uuid("ID de livro inválido"),
  dueDate: z.coerce.date(),
});

type RegisterLoanBody = z.infer<typeof registerLoanBodySchema>;

@Controller("/nous-loans-register")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class RegisterLoansController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(registerLoanBodySchema)) body: RegisterLoanBody
  ) {
    const { userId, bookId, dueDate } = body;

    if (dueDate <= new Date()) {
      throw new BadRequestException("A data de devolução deve ser no futuro.");
    }

    const [userExists, bookExists] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.book.findUnique({ where: { id: bookId } }),
    ]);

    if (!userExists) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    if (!bookExists) {
      throw new BadRequestException("Livro não encontrado.");
    }

    const activeLoan = await this.prisma.loan.findFirst({
      where: {
        bookId: bookId,
        status: { in: ["ACTIVE", "OVERDUE"] },
      },
    });

    if (activeLoan) {
      throw new ConflictException("Este livro não está disponível (já está emprestado).");
    }

    const loan = await this.prisma.loan.create({
      data: {
        userId: userId,
        bookId: bookId,
        dueDate: dueDate,
      },
    });

    return loan;
  }
}