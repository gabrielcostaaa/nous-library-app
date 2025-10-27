import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
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
} from '@nestjs/swagger';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});
type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@ApiTags('User')
@Controller('/nous-user-create-account')
export class UserCreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criação de nova conta de usuário comum' })
  @ApiBody({
    description: 'Dados necessários para criar uma conta de usuário',
    schema: {
      example: {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senhaSegura123',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Conta criada com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        role: 'USER',
        createdAt: '2025-10-25T20:30:00.000Z',
      },
    },
  })
  @ApiConflictResponse({ description: 'E-mail já cadastrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const hashPassword = await hash(password, 8);

    const account = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: 'USER',
      },
    });

    return account;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as contas de usuários' })
  @ApiOkResponse({
    description: 'Lista de contas retornada com sucesso',
    schema: {
      example: [
        {
          id: 'uuid',
          name: 'João Silva',
          email: 'joao.silva@example.com',
          role: 'USER',
          createdAt: '2025-10-25T20:30:00.000Z',
        },
        {
          id: 'uuid2',
          name: 'Maria Oliveira',
          email: 'maria.oliveira@example.com',
          role: 'USER',
          createdAt: '2025-10-26T13:15:00.000Z',
        },
      ],
    },
  })
  async getAccounts() {
    const accounts = await this.prisma.user.findMany();
    return accounts;
  }
}
