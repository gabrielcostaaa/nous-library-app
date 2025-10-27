import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/nous-books-list")
@UseGuards(AuthGuard("jwt"))
export class ListBooksController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle() {
    const books = await this.prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
    return books;
  }
}
