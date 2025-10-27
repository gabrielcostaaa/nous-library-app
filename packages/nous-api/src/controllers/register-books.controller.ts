import {
  Body,
  Controller,
  Post,
  UseGuards,
  ConflictException,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/auth/admin.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const registerBookBodySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  author: z.string().min(1, "O autor é obrigatório"),
  genre: z.string().optional(),
  imageUrl: z.url("A URL da imagem é inválida").optional(),
  basePrice: z.coerce.number().positive("O preço base deve ser um número positivo"),
});

type RegisterBookBody = z.infer<typeof registerBookBodySchema>;

@Controller("/nous-books-register")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class RegisterBooksController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(registerBookBodySchema)) body: RegisterBookBody,
  ) {
    const { title, author, genre, imageUrl, basePrice } = body;

    const existingBook = await this.prisma.book.findFirst({
      where: {
        title: title,
        author: author,
      },
    });

    if (existingBook) {
      throw new ConflictException("Um livro com este título e autor já existe no acervo.");
    }

    const book = await this.prisma.book.create({
      data: {
        title,
        author,
        genre: genre?.trim() || "Indefinido",
        imageUrl: imageUrl?.trim() || null,
        basePrice,
      },
    });

    return book;
  }
}