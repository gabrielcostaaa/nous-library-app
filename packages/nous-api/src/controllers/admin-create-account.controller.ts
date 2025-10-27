import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { hash } from 'bcryptjs';
import { AdminGuard } from 'src/auth/admin.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});
type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('/nous-admin-create-account')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminCreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criação de nova conta de administrador' })
  @ApiBody({
    description: 'Dados necessários para criar uma conta de administrador',
    schema: {
      example: {
        name: 'Carlos Almeida',
        email: 'carlos.almeida@example.com',
        password: 'senhaForte123',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Conta de administrador criada com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'Carlos Almeida',
        email: 'carlos.almeida@example.com',
        role: 'ADMIN',
        createdAt: '2025-10-25T20:30:00.000Z',
      },
    },
  })
  @ApiConflictResponse({ description: 'E-mail já cadastrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('E-mail já cadastrado');

    const hashPassword = await hash(password, 8);

    const account = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: 'ADMIN',
      },
    });

    return account;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as contas de administradores' })
  @ApiOkResponse({
    description: 'Lista de administradores retornada com sucesso',
    schema: {
      example: [
        {
          id: 'uuid',
          name: 'Carlos Almeida',
          email: 'carlos.almeida@example.com',
          role: 'ADMIN',
          createdAt: '2025-10-25T20:30:00.000Z',
        },
        {
          id: 'uuid2',
          name: 'Fernanda Souza',
          email: 'fernanda.souza@example.com',
          role: 'ADMIN',
          createdAt: '2025-10-26T13:15:00.000Z',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
  async getAccounts() {
    const accounts = await this.prisma.user.findMany({
      where: { role: 'ADMIN' },
    });
    return accounts;
  }
}
