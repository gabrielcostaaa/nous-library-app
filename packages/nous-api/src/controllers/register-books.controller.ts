import {
  Body,
  Controller,
  Post,
  UseGuards,
  ConflictException,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody as ApiBodySwagger,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'node:path';
import * as fs from 'node:fs';
import type { Request } from 'express';

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const BOOKS_DIR = path.join(UPLOADS_DIR, 'books');
fs.mkdirSync(BOOKS_DIR, { recursive: true });

const allowedMimes = new Set(['image/png', 'image/jpeg', 'image/webp']);

function fileFilter(_req: Request, file: Express.Multer.File, cb: (e: any, ok: boolean) => void) {
  if (!allowedMimes.has(file.mimetype)) {
    return cb(new BadRequestException('Tipo de arquivo não suportado (use PNG/JPEG/WEBP)'), false);
  }
  cb(null, true);
}

function buildPublicBase(req: Request) {
  const env = process.env.LOCAL_PUBLIC_BASE_URL;
  if (env) return env.replace(/\/$/, '');
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'http';
  const host = (req.headers['x-forwarded-host'] as string) || req.get('host');
  return `${proto}://${host}/static`;
}

const registerBookBodySchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  author: z.string().min(1, 'O autor é obrigatório'),
  genre: z.string().optional(),
  imageUrl: z.string().url('A URL da imagem é inválida').optional(),
  basePrice: z.coerce.number().positive('O preço base deve ser um número positivo'),
});
type RegisterBookBody = z.infer<typeof registerBookBodySchema>;

@ApiTags('Books')
@ApiBearerAuth()
@Controller('/nous-books-register')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class RegisterBooksController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Registrar um novo livro no acervo (aceita arquivo ou imageUrl)' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'Livro já existente.' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBodySwagger({
    schema: {
      type: 'object',
      required: ['title', 'author', 'basePrice'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        genre: { type: 'string' },
        basePrice: { type: 'number' },
        imageUrl: { type: 'string', format: 'uri', description: 'Opcional. Ignorado se enviar arquivo.' },
        cover: { type: 'string', format: 'binary', description: 'Opcional. Arquivo da capa.' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: BOOKS_DIR,
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname).toLowerCase();
          const base = path.basename(file.originalname, ext)
            .toLowerCase()
            .replace(/[^\w\-]+/g, '-')
            .replace(/\-+/g, '-');
          cb(null, `${base}${ext}`);
        }
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter,
    }),
  )
  async handle(
    @UploadedFile() cover: Express.Multer.File | undefined,
    @Req() req: Request,
    @Body(new ZodValidationPipe(registerBookBodySchema)) body: RegisterBookBody,
  ) {
    const { title, author, genre, imageUrl, basePrice } = body;

    const existingBook = await this.prisma.book.findFirst({ where: { title, author } });
    if (existingBook) throw new ConflictException('Um livro com este título e autor já existe.');

    const publicBase = buildPublicBase(req);
    const finalImageUrl = cover
      ? `${publicBase}/books/${cover.filename}`
      : (imageUrl?.trim() || null);

    return this.prisma.book.create({
      data: {
        title,
        author,
        genre: genre?.trim() || 'Indefinido',
        imageUrl: finalImageUrl,
        basePrice,
      },
    });
  }
}