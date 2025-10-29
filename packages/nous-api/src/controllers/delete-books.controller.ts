import {
  Controller,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  ConflictException,
  BadRequestException,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminGuard } from "src/auth/admin.guard";

@ApiTags("Books")
@ApiBearerAuth()
@Controller("/nous-books-delete")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class DeleteBookController {
  constructor(private prisma: PrismaService) { }

  @Delete()
  @HttpCode(200)
  @ApiOperation({ summary: "Remover um livro" })
  @ApiQuery({ name: "id", required: true, type: String, description: "ID do livro" })
  @ApiResponse({ status: 200, description: "Livro removido com sucesso." })
  @ApiResponse({ status: 404, description: "Livro não encontrado." })
  @ApiResponse({ status: 409, description: "Livro emprestado no momento." })
  async handle(@Query("id") id: string) {
    if (!id) throw new BadRequestException("Parâmetro id é obrigatório.");

    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException("Livro não encontrado.");

    const activeLoan = await this.prisma.loan.findFirst({
      where: { bookId: id, returnDate: null },
      select: { id: true },
    });
    if (activeLoan) {
      throw new ConflictException("Não é possível remover: o livro está emprestado no momento.");
    }

    await this.prisma.book.delete({ where: { id } });
    return { message: "Livro removido com sucesso." };
  }
}
