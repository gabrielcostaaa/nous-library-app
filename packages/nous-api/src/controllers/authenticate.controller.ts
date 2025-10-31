import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { PrismaService } from '../prisma/prisma.service';
import { z } from 'zod';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type AuthenticateBody = z.infer<typeof authenticateBodySchema>;

@ApiTags('Admin')
@Controller('/nous-admin-authenticate')
export class AuthenticateController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Login de administrador' })
  @ApiBody({
    description: 'Credenciais de acesso do administrador',
    schema: {
      example: {
        email: 'carlos.almeida@example.com',
        password: 'senhaForte123',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Token de acesso gerado',
    schema: {
      example: { access_token: 'xxx.yyy.zzz' },
    },
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas ou usuário não possui permissão de administrador',
  })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBody) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Acesso negado. Requer permissão de administrador.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas');

    const accessToken = this.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return { access_token: accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}
