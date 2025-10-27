import {
  Body,
  Controller,
  Post,
  UseGuards,
  ConflictException,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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

@ApiTags("Books")
@ApiBearerAuth()
@Controller("/nous-books-register")
@UseGuards(AuthGuard("jwt"), AdminGuard)
export class RegisterBooksController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Registrar um novo livro no acervo" })
  @ApiResponse({ status: 201, description: "Livro criado com sucesso." })
  @ApiResponse({ status: 409, description: "Livro já existente." })
  async handle(@Body(new ZodValidationPipe(registerBookBodySchema)) body: RegisterBookBody) {
    const { title, author, genre, imageUrl, basePrice } = body;

    const existingBook = await this.prisma.book.findFirst({ where: { title, author } });
    if (existingBook) throw new ConflictException("Um livro com este título e autor já existe.");

    return this.prisma.book.create({
      data: {
        title,
        author,
        genre: genre?.trim() || "Indefinido",
        imageUrl: imageUrl?.trim() || null,
        basePrice,
      },
    });
  }
}