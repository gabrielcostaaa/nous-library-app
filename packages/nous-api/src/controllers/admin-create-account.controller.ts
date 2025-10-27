import { Body, ConflictException, Controller, Get, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { hash } from "bcryptjs";
import { AdminGuard } from "src/auth/admin.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});
type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@Controller('/nous-admin-create-account')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminCreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
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
        role: 'ADMIN',
      },
    });
    return account;
  }

  @Get()
  async getAccounts() {
    const accounts = await this.prisma.user.findMany();
    return accounts;
  }
}