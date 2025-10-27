import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { PrismaService } from "../prisma/prisma.service";
import { z } from "zod";

const authenticateUserBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type AuthenticateUserBody = z.infer<typeof authenticateUserBodySchema>;

@Controller("/nous-user-authenticate")
export class AuthenticateUserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
  async handle(@Body() body: AuthenticateUserBody) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Credenciais inválidas");

    if (user.role !== "USER") {
      throw new UnauthorizedException("Acesso negado. Use a rota de administrador.");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("Credenciais inválidas");

    const accessToken = this.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return { access_token: accessToken };
  }
}
