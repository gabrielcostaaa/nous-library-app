import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("Books")
@ApiBearerAuth()
@Controller("/nous-books-list")
@UseGuards(AuthGuard("jwt"))
export class ListBooksController {
  constructor(private prisma: PrismaService) { }

  @Get()
  @ApiOperation({ summary: "Listar todos os livros" })
  @ApiResponse({ status: 200, description: "Lista de livros retornada com sucesso." })
  async handle() {
    return this.prisma.book.findMany({ orderBy: { createdAt: "desc" } });
  }
}
